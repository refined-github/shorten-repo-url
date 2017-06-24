const {URL} = require('url');

const patchDiffRegex = /[.](patch|diff)$/;
const releaseRegex = /(?:releases[/]tag|tags)[/]([^/]+)/;
const labelRegex = /labels[/]([^/]+)/;
const releaseArchiveRegex = /archive[/](.+)([.]zip|[.]tar[.]gz)/;
const releaseDownloadRegex = /releases[/]download[/]([^/]+)[/](.+)/;

const reservedPaths = [
	'new',
	'join',
	'site',
	'blog',
	'gist',
	'about',
	'login',
	'pulls',
	'search',
	'issues',
	'explore',
	'contact',
	'pricing',
	'trending',
	'settings',
	'features',
	'business',
	'personal',
	'security',
	'dashboard',
	'showcases',
	'open-source',
	'marketplace',
	'organizations',
	'notifications',
];

function styleRevision(revision) {
	if (!revision) {
		return;
	}
	revision = revision.replace(patchDiffRegex, '');
	if (/^[0-9a-f]{40}$/.test(revision)) {
		revision = revision.substr(0, 7);
	}
	return `<code>${revision}</code>`;
}

// Filter out null values
function joinValues(array, delimiter = '/') {
	return array.filter(s => s).join(delimiter);
}

function shortenURL(href, currentUrl = 'https://github.com') {
	if (!href) {
		return;
	}

	currentUrl = new URL(currentUrl);
	const currentRepo = currentUrl.pathname.slice(1).split('/', 2).join('/');

	/**
	 * Parse URL
	 */
	const {
		origin,
		pathname,
		search,
		hash,
	} = new URL(href);

	const isRaw = [
		'https://raw.githubusercontent.com',
		'https://cdn.rawgit.com',
		'https://rawgit.com',
	].includes(origin);

	let [
		user,
		repo,
		type,
		revision,
		...filePath
	] = pathname.substr(1).split('/');

	if (isRaw) {
		[
			user,
			repo,
			// Raw URLs don't have `blob` here
			revision,
			...filePath
		] = pathname.substr(1).split('/');
		type = 'raw';
	}

	revision = styleRevision(revision);
	filePath = filePath.join('/');

	const isLocal = origin === currentUrl.origin;
	const isThisRepo = (isLocal || isRaw) && currentRepo === `${user}/${repo}`;
	const isReserved = reservedPaths.includes(user);
	const [, diffOrPatch] = pathname.match(patchDiffRegex) || [];
	const [, release] = pathname.match(releaseRegex) || [];
	const [, releaseTag, releaseTagExt] = pathname.match(releaseArchiveRegex) || [];
	const [, downloadTag, downloadFilename] = pathname.match(releaseDownloadRegex) || [];
	const [, label] = pathname.match(labelRegex) || [];
	const isFileOrDir = revision && [
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

	if (isReserved || (!isLocal && !isRaw)) {
		return href
		.replace(/^https:[/][/]/, '')
		.replace(/^www[.]/, '')
		.replace(/[/]$/, '');
	}

	if (user && !repo) {
		return `@${user}${search}${hash}`;
	}

	if (isFileOrDir) {
		const file = `${repoUrl}${filePath ? (repoUrl ? ':' : '/') : ''}${filePath}`;
		const revisioned = joinValues([file, revision], '@');
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

	if (releaseTagExt) {
		const partial = joinValues([repoUrl, `<code>${releaseTag}</code>`], '@');
		return `${partial}${releaseTagExt}${search}${hash}`;
	}

	if (downloadFilename) {
		const partial = joinValues([repoUrl, `<code>${downloadTag}</code>`], '@');
		return `${partial} ${downloadFilename}${search}${hash} (download)`;
	}

	if (label) {
		return joinValues([repoUrl, label]) + `${search}${hash} (label)`;
	}

	// Drop leading and trailing slash of relative path
	return `${pathname.replace(/^[/]|[/]$/g, '')}${search}${hash}`;
}

function applyToLink(a, currentUrl) {
	// Shorten only if the link name hasn't bee customized.
	// .href automatically adds a / to naked origins
	// so that needs to be tested too
	if (a.href === a.textContent || a.href === `${a.textContent}/`) {
		const shortened = shortenURL(a.href, currentUrl);
		// Only touch the dom is the URL has been shortened
		if (shortened !== a.textContent) {
			a.innerHTML = shortened;
		}
	}
}

module.exports = shortenURL;
module.exports.applyToLink = applyToLink;
