const reservedPaths = require('github-reserved-names/reserved-names.json');

const patchDiffRegex = /[.](patch|diff)$/;
const releaseRegex = /^releases[/]tag[/]([^/]+)/;
const labelRegex = /^labels[/]([^/]+)/;
const compareRegex = /^compare[/]([^/]+)/;
const pullRegex = /^pull[/](\d+)[/]([^/]+)$/;
const releaseArchiveRegex = /^archive[/](.+)([.]zip|[.]tar[.]gz)/;
const releaseDownloadRegex = /^releases[/]download[/]([^/]+)[/](.+)/;
const dependentsRegex = /^network[/]dependents[/]?$/;
const dependenciesRegex = /^network[/]dependencies[/]?$/;

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
		hash
	} = new URL(href);

	const pathnameParts = pathname.slice(1).split('/'); // ['user', 'repo', 'pull', '342']
	const repoPath = pathnameParts.slice(2).join('/'); // 'pull/342'

	const isRaw = [
		'https://raw.githubusercontent.com',
		'https://cdn.rawgit.com',
		'https://rawgit.com'
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
	const isThisRepo = (isLocal || isRaw) && currentRepo === `${user}/${repo}`;
	const isReserved = reservedPaths.includes(user);
	const isDependents = dependentsRegex.test(repoPath);
	const isDependencies = dependenciesRegex.test(repoPath);
	const [, diffOrPatch] = repoPath.match(patchDiffRegex) || [];
	const [, release] = repoPath.match(releaseRegex) || [];
	const [, releaseTag, releaseTagExt] = repoPath.match(releaseArchiveRegex) || [];
	const [, downloadTag, downloadFilename] = repoPath.match(releaseDownloadRegex) || [];
	const [, label] = repoPath.match(labelRegex) || [];
	const [, compare] = repoPath.match(compareRegex) || [];
	const [, pull, pullPage] = repoPath.match(pullRegex) || [];
	const isFileOrDir = revision && [
		'raw',
		'tree',
		'blob',
		'blame',
		'commits'
	].includes(type);

	const repoUrl = isThisRepo ? '' : `${user}/${repo}`;

	/**
	 * Shorten URL
	 */

	if (isReserved || pathname === '/' || (!isLocal && !isRaw)) {
		return href
			.replace(/^https:[/][/]/, '')
			.replace(/^www[.]/, '')
			.replace(/[/]$/, '');
	}

	if (user && !repo) {
		return `@${user}${search}${hash}`;
	}

	if (isFileOrDir) {
		const revisioned = joinValues([joinValues([repoUrl, revision], '@'), filePath], '/');
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

	if (isDependents) {
		return `${user}/${repo} (dependents)`;
	}

	if (isDependencies) {
		return `${user}/${repo} (dependencies)`;
	}

	if (pull && pullPage) {
		return `${repoUrl}#${pull} (${pullPage})`;
	}

	if (compare) {
		const partial = joinValues([repoUrl, revision], '@');
		return `${partial}${search}${hash} (compare)`;
	}

	// Drop leading and trailing slash of relative path
	return `${pathname.replace(/^[/]|[/]$/g, '')}${search}${hash}`;
}

function applyToLink(a, currentUrl) {
	// Shorten only if the link name hasn't been customized.
	// .href automatically adds a / to naked origins
	// so that needs to be tested too
	if (a.href === a.textContent || a.href === `${a.textContent}/`) {
		const shortened = shortenURL(a.href, currentUrl);
		// Only touch the dom is the URL has been shortened
		if (shortened !== a.textContent) {
			a.innerHTML = shortened;
			return true;
		}
	}

	return false;
}

module.exports = shortenURL;
module.exports.applyToLink = applyToLink;
