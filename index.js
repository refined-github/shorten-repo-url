import reservedNames from 'github-reserved-names/reserved-names.json' with { type: 'json' };

const patchDiffRegex = /[.](patch|diff)$/;
const releaseRegex = /^releases[/]tag[/]([^/]+)/;
const labelRegex = /^labels[/]([^/]+)/;
const compareRegex = /^compare[/]([^/]+)/;
const pullRegex = /^pull[/](?<pull>\d+)(?:[/](?<pullPage>[^/]+))?(?:[/](?<pullPartialStart>[\da-f]{40})[.][.](?<pullPartialEnd>[\da-f]{40}))?$/;
const issueRegex = /^issues[/](\d+)$/;
const commitRegex = /^commit[/]([\da-f]{40})$/;
const releaseArchiveRegex = /^archive[/](.+)([.]zip|[.]tar[.]gz)/;
const releaseDownloadRegex = /^releases[/]download[/]([^/]+)[/](.+)/;
const dependentsRegex = /^network[/]dependents[/]?$/;
const dependenciesRegex = /^network[/]dependencies[/]?$/;
const wikiRegex = /^wiki[/](.+)$/;

/** @type {(searchParameters: URLSearchParams, pathname: string) => string} */
function pullQueryOut(searchParameters, pathname) {
	let query = searchParameters.get('q');

	if (!query) {
		return '';
	}

	searchParameters.delete('q');
	if (pathname.endsWith('/issues')) {
		query = query.replace('is:issue', '');
	}

	if (pathname.endsWith('/pulls')) {
		query = query.replace('is:pr', '');
	}

	return ` (${query.replaceAll(/\s+/g, ' ').trim()})`;
}

/** @param revision {string} */
function styleRevision(revision) {
	if (!revision) {
		return;
	}

	revision = revision.replace(patchDiffRegex, '');
	if (/^[0-9a-f]{40}$/.test(revision)) {
		revision = revision.slice(0, 7);
	}

	return `<code>${revision}</code>`;
}

/** @param hash {string} */
function commentIndicator(hash) {
	if (hash.startsWith('#issue-') || hash.startsWith('#commitcomment-')) {
		return ' (comment)';
	}

	if (hash.startsWith('#pullrequestreview-') || hash.startsWith('#discussion_r')) {
		return ' (review)';
	}

	return '';
}

/**
 * Filter out null values
 * @type {(array: string[], delimiter?: string) => string}
 */
function joinValues(array, delimiter = '/') {
	return array.filter(Boolean).join(delimiter);
}

/**
 * @param href {string}
 * @param currentUrl {string}
 */
function shortenRepoUrl(href, currentUrl = 'https://github.com') {
	if (!href) {
		return;
	}

	currentUrl = new URL(currentUrl);
	const currentRepo = currentUrl.pathname.slice(1).split('/', 2).join('/');

	/**
	 * Parse URL
	 */
	const url = new URL(href);
	const {
		origin,
		search,
		searchParams,
		hash,
	} = url;
	const pathname = decodeURIComponent(url.pathname);

	const pathnameParts = pathname.slice(1).split('/'); // ['user', 'repo', 'pull', '342']
	const repoPath = pathnameParts.slice(2).join('/'); // 'pull/342'

	const isRaw = [
		'https://raw.githubusercontent.com',
		'https://cdn.rawgit.com',
		'https://rawgit.com',
	].includes(origin);

	const isRedirection = [
		'https://togithub.com', // Renovate
		'https://github-redirect.dependabot.com', // Dependabot
		'https://redirect.github.com', // Dependabot
	].includes(origin);

	let [
		user,
		repo,
		type,
		revision,
		...filePath
	] = pathnameParts;

	if (isRaw) {
		[
			user,
			repo,
			// Raw URLs don't have `blob` here
			revision,
			...filePath
		] = pathnameParts;
		type = 'raw';
	}

	revision = styleRevision(revision);
	filePath = filePath.join('/');

	const isLocal = origin === currentUrl.origin;
	const isThisRepo = (isLocal || isRaw || isRedirection) && currentRepo === `${user}/${repo}`;
	const isReserved = reservedNames.includes(user);
	const isDependents = dependentsRegex.test(repoPath);
	const isDependencies = dependenciesRegex.test(repoPath);
	const [, diffOrPatch] = repoPath.match(patchDiffRegex) || [];
	const [, release] = repoPath.match(releaseRegex) || [];
	const [, releaseTag, releaseTagExtension] = repoPath.match(releaseArchiveRegex) || [];
	const [, downloadTag, downloadFilename] = repoPath.match(releaseDownloadRegex) || [];
	const [, label] = repoPath.match(labelRegex) || [];
	const [, compare] = repoPath.match(compareRegex) || [];
	const {pull, pullPage, pullPartialStart, pullPartialEnd} = repoPath.match(pullRegex)?.groups ?? {};
	const [, issue] = isRedirection ? repoPath.match(issueRegex) || [] : [];
	const [, commit] = isRedirection ? repoPath.match(commitRegex) || [] : [];
	const [, wiki] = repoPath.match(wikiRegex) || [];
	const isFileOrDirectory = revision && [
		'raw',
		'tree',
		'blob',
		'blame',
		'commits',
	].includes(type);

	const repoUrl = isThisRepo ? '' : `${user}/${repo}`;

	/**
	 * Shorten URL
	 */
	if (isReserved || pathname === '/' || (!isLocal && !isRaw && !isRedirection)) {
		const origin = href.split('/', 3).join('/');
		const parsedUrl = new URL(href);
		const cleanHref = [
			origin
				.replace(/^https:[/][/]/, '')
				.replace(/^www[.]/, ''),
			decodeURI(parsedUrl.pathname)
				.replace(/[/]$/, ''),
		];

		if (['issues', 'pulls'].includes(user) && !repo) {
			const query = pullQueryOut(parsedUrl.searchParams, parsedUrl.pathname);
			cleanHref.push(parsedUrl.search, query);
		} else {
			cleanHref.push(parsedUrl.search);
		}

		cleanHref.push(decodeURI(parsedUrl.hash));

		return cleanHref.join('');
	}

	if (user && !repo) {
		return `@${user}${search}${hash}`;
	}

	if (isFileOrDirectory) {
		const revisioned = joinValues(
			[joinValues([repoUrl, revision], '@'), filePath],
			'/',
		);
		const partial = `${revisioned}${search}${hash}`;
		if (type !== 'blob' && type !== 'tree') {
			return `${partial} (${type})`;
		}

		return partial;
	}

	if (diffOrPatch) {
		const partial = joinValues([repoUrl, revision], '@');
		return `${partial}.${diffOrPatch}${search}${hash}`;
	}

	if (release) {
		const partial = joinValues([repoUrl, `<code>${release}</code>`], '@');
		return `${partial}${search}${hash} (release)`;
	}

	if (releaseTagExtension) {
		const partial = joinValues([repoUrl, `<code>${releaseTag}</code>`], '@');
		return `${partial}${releaseTagExtension}${search}${hash}`;
	}

	if (downloadFilename) {
		const partial = joinValues([repoUrl, `<code>${downloadTag}</code>`], '@');
		return `${partial} ${downloadFilename}${search}${hash} (download)`;
	}

	if (label) {
		return (
			joinValues([repoUrl, decodeURIComponent(label)])
			+ `${search}${hash} (label)`
		);
	}

	if (isDependents) {
		return `${user}/${repo} (dependents)`;
	}

	if (isDependencies) {
		return `${user}/${repo} (dependencies)`;
	}

	if (pull) {
		if (pullPage === 'files' && pullPartialStart && pullPartialEnd) {
			return `<code>${pullPartialStart.slice(0, 8)}..${pullPartialEnd.slice(0, 8)}</code> (#${pull})`;
		}

		if (pullPage) {
			return `${repoUrl}#${pull} (${pullPage})`;
		}
	}

	if (compare) {
		const partial = joinValues([repoUrl, revision], '@');
		return `${partial}${search}${hash} (compare)`;
	}

	if (wiki) {
		const hashPart = (hash ? ' (' + hash.slice(1) + ')' : '');
		const cleanLabel = (wiki + hashPart).replaceAll('-', ' ');
		const repoPart = repoUrl ? ` (${repoUrl})` : '';
		return `Wiki: ${decodeURIComponent(cleanLabel)}${repoPart}`;
	}

	// Shorten URLs that would otherwise be natively shortened
	if (isRedirection) {
		if (issue) {
			return `${repoUrl}#${issue}${commentIndicator(hash)}`;
		}

		if (pull) {
			return `${repoUrl}#${pull}${commentIndicator(hash)}`;
		}

		if (commit) {
			return joinValues([repoUrl, `<code>${commit.slice(0, 7)}</code>`], '@') + commentIndicator(hash);
		}
	}

	const query = pullQueryOut(searchParams, pathname);

	if (searchParams.get('tab') === 'readme-ov-file') {
		searchParams.delete('tab');
	}

	// Drop leading and trailing slash of relative path
	return pathname.replaceAll(/^[/]|[/]$/g, '') + url.search + hash + query;
}

/**
 *  Without this, <a>%%</a> would throw an error
 *  @type {(url: string) => string}
 */
function safeDecode(url) {
	try {
		return new URL(url).href;
	} catch {
		return url;
	}
}

/** @param a {HTMLAnchorElement} */
function getLinkHref(a) {
	return a.dataset.originalHref ?? a.href;
}

/** @param a {HTMLAnchorElement} */
function isCustomLink(a) {
	const url = safeDecode(getLinkHref(a));
	const label = safeDecode(a.textContent);
	return (
		// `trim` makes it compatible with this feature: https://github.com/sindresorhus/refined-github/pull/3085
		url !== label.trim()
		// .href automatically adds a / to naked origins so that needs to be tested too
		&& url !== `${label}/`
	);
}

/** @type {(a: HTMLAnchorElement, currentUrl: string) => boolean} */
export function applyToLink(a, currentUrl) {
	// `safeDecode` is needed because some URLs are encoded in different ways in the DOM and in the `href` property: https://github.com/refined-github/shorten-repo-url/issues/19

	if (
		// Shorten only if the link name hasn't been customized
		!isCustomLink(a)
		// And if there are no additional images in the link
		&& !a.firstElementChild
	) {
		const url = a.textContent;
		const shortened = shortenRepoUrl(url, currentUrl);
		a.replaceChildren(
			...shortened.split(
				/<code>([^<]+)<\/code>/g,
			).map((part, i) => {
				if (i % 2 === 0) {
					return part;
				}

				const codeElement = document.createElement('code');
				codeElement.textContent = part;
				return codeElement;
			}),
		);
		return true;
	}

	return false;
}

export default shortenRepoUrl;
