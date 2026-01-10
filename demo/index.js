import shortenUrl from '../index.js';

// URLs imported from index.test.js
const urls = [
	'https://github.com/fregante/shorten-repo-url/',
	'https://github.com/fregante/shorten-repo-url/?tab=readme-ov-file',
	'https://github.com/fregante/shorten-repo-url/tree/v0.12',
	'https://github.com/fregante/shorten-repo-url/tree/d71718db6aa4feb8dc10edbad1134472468e971a',
	'https://github.com/nodejs/node/',
	'https://github.com/nodejs/shorten-repo-url/',
	'https://github.com/nodejs/node/tree/v0.12',
	'https://github.com/nodejs/node/tree/d71718db6aa4feb8dc10edbad1134472468e971a',
	'https://github.com/fregante/shorten-repo-url/tree/master/doc',
	'https://github.com/fregante/shorten-repo-url/tree/v0.12/doc',
	'https://github.com/fregante/shorten-repo-url/tree/d71718db6aa4feb8dc10edbad1134472468e971a/doc',
	'https://github.com/nodejs/node/tree/master/doc',
	'https://github.com/nodejs/node/tree/v0.12/doc',
	'https://github.com/nodejs/node/tree/d71718db6aa4feb8dc10edbad1134472468e971a/doc',
	'https://github.com/fregante/shorten-repo-url/blob/master/.gitignore',
	'https://github.com/fregante/shorten-repo-url/blob/v0.12/.gitignore',
	'https://github.com/fregante/shorten-repo-url/blob/cc8fc46/.gitignore',
	'https://github.com/fregante/shorten-repo-url/blob/main/한글.txt',
	'https://github.com/nodejs/node/blob/master/.gitignore',
	'https://github.com/nodejs/node/blob/v0.12/.gitignore',
	'https://github.com/nodejs/node/blob/cc8fc46/.gitignore',
	'https://github.com/fregante/shorten-repo-url/blame/master/.gitignore',
	'https://github.com/fregante/shorten-repo-url/blame/v0.12/.gitignore',
	'https://github.com/fregante/shorten-repo-url/blame/cc8fc46/.gitignore',
	'https://github.com/nodejs/node/blame/master/.gitignore',
	'https://github.com/nodejs/node/blame/v0.12/.gitignore',
	'https://github.com/nodejs/node/blame/cc8fc46/.gitignore',
	'https://github.com/fregante/shorten-repo-url/commits/master/.gitignore',
	'https://github.com/fregante/shorten-repo-url/commits/v0.12/.gitignore',
	'https://github.com/fregante/shorten-repo-url/commits/cc8fc46/.gitignore',
	'https://github.com/nodejs/node/commits/master/.gitignore',
	'https://github.com/nodejs/node/commits/v0.12/.gitignore',
	'https://github.com/nodejs/node/commits/cc8fc46/.gitignore',
	'https://github.com/fregante/shorten-repo-url/commit/cc8fc46.diff',
	'https://github.com/fregante/shorten-repo-url/commit/cc8fc46.patch',
	'https://github.com/nodejs/node/commit/cc8fc46.diff',
	'https://github.com/nodejs/node/commit/cc8fc46.patch',
	'https://github.com/fregante/shorten-repo-url/releases/tag/v0.12.0',
	'https://github.com/nodejs/node/releases/tag/v0.12.0',
	'https://github.com/fregante/shorten-repo-url/milestone/25',
	'https://github.com/fregante/shorten-repo-url/compare/d71718db6aa4feb8dc10edbad1134472468e971a',
	'https://github.com/fregante/shorten-repo-url/compare/master',
	'https://github.com/fregante/shorten-repo-url/compare/master...master',
	'https://github.com/nodejs/node/compare/d71718db6aa4feb8dc10edbad1134472468e971a',
	'https://github.com/nodejs/node/compare/master',
	'https://github.com/nodejs/node/compare/master...master',
	'https://github.com/nodejs/node/milestone/25',
	'https://github.com/fregante/shorten-repo-url/labels/npm',
	'https://github.com/nodejs/node/labels/npm',
	'https://github.com/nodejs/node/labels/Please%21%20♥',
	'https://github.com/refined-github/refined-github/labels/Please%21%20♥%EF%B8%8E',
	'https://github.com/fregante/shorten-repo-url/archive/6.4.1.zip',
	'https://github.com/fregante/shorten-repo-url/releases/download/6.4.1/now-macos',
	'https://github.com/zeit/now-cli/archive/6.4.1.zip',
	'https://github.com/zeit/now-cli/releases/download/6.4.1/now-macos',
	'https://github.com/bfred-it/shorten-repo-url/network/dependents',
	'https://github.com/bfred-it/shorten-repo-url/network/dependencies',
	'https://github.com/network/dependencies',
	'https://github.com/bfred-it/shorten-repo-url/wiki',
	'https://github.com/fregante/shorten-repo-url/pulse',
	'https://github.com/fregante/shorten-repo-url/labels',
	'https://github.com/fregante/shorten-repo-url/compare',
	'https://github.com/fregante/shorten-repo-url/network',
	'https://github.com/fregante/shorten-repo-url/projects',
	'https://github.com/fregante/shorten-repo-url/releases',
	'https://github.com/fregante/shorten-repo-url/milestones',
	'https://github.com/fregante/shorten-repo-url/contributors',
	'https://github.com/fregante/shorten-repo-url/pull/123/files',
	'https://github.com/nodejs/node/pull/123/files',
	'https://github.com/fregante/shorten-repo-url/pull/123/commits',
	'https://github.com/fregante/shorten-repo-url/pull/123/checks',
	'https://github.com/nodejs/node/wiki',
	'https://github.com/nodejs/node/pulse',
	'https://github.com/nodejs/node/labels',
	'https://github.com/nodejs/node/compare',
	'https://github.com/nodejs/node/network',
	'https://github.com/nodejs/node/projects',
	'https://github.com/nodejs/node/releases',
	'https://github.com/nodejs/node/milestones',
	'https://github.com/nodejs/node/contributors',
	'https://github.com/nodejs/node/graphs/commit-activity',
	'https://rawgit.com/fregante/shorten-repo-url/master/.gitignore',
	'https://cdn.rawgit.com/fregante/shorten-repo-url/v0.12/.gitignore',
	'https://cdn.rawgit.com/fregante/shorten-repo-url/d71718db/.gitignore',
	'https://raw.githubusercontent.com/fregante/shorten-repo-url/master/.gitignore',
	'https://raw.githubusercontent.com/fregante/shorten-repo-url/v0.12/.gitignore',
	'https://raw.githubusercontent.com/fregante/shorten-repo-url/d71718db/.gitignore',
	'https://rawgit.com/nodejs/node/master/.gitignore',
	'https://cdn.rawgit.com/nodejs/node/v0.12/.gitignore',
	'https://cdn.rawgit.com/nodejs/node/d71718db/.gitignore',
	'https://raw.githubusercontent.com/nodejs/node/master/.gitignore',
	'https://raw.githubusercontent.com/nodejs/node/v0.12/.gitignore',
	'https://raw.githubusercontent.com/nodejs/node/d71718db/.gitignore',
	'https://github.com/sindresorhus',
	'https://github.com/nodejs',
	'https://github.com/pulls',
	'https://github.com/issues',
	'https://github.com/trending',
	'https://github.com/features',
	'https://github.com/marketplace',
	'https://github.com/trending/developers',
	'https://github.com/settings/profile',
	'https://github.com/',
	'https://github.com',
	'https://github.com/fregante/shorten-repo-url/issues',
	'https://github.com/fregante/shorten-repo-url/issues?q=wow',
	'https://github.com/fregante/shorten-repo-url/issues?q=is%3Aissue++is%3Aopen+sort%3Aupdated-desc+&unrelated=true',
	'https://github.com/issues?q=is%3Aissue++is%3Aopen+sort%3Aupdated-desc+&unrelated=true',
	'https://github.com/pulls?q=is%3Apr++is%3Aopen+sort%3Aupdated-desc+&unrelated=true',
	'https://github.com/sindresorhus/notifier-for-github/pull/253/files/6b4489d417c9425dc27c5fb8d6b4a8518debd035..60cdcf3c3646164441bf8f037cef620479cdec59',
	'https://togithub.com/fregante/shorten-repo-url/issues/25',
	'https://togithub.com/fregante/shorten-repo-url/issues/28#issue-850900171',
	'https://togithub.com/fregante/shorten-repo-url/pull/32',
	'https://togithub.com/fregante/shorten-repo-url/pull/32/files',
	'https://togithub.com/fregante/shorten-repo-url/pull/33#pullrequestreview-801229042',
	'https://togithub.com/fregante/shorten-repo-url/pull/33#discussion_r750069394',
	'https://togithub.com/nodejs/node/pull/123',
	'https://togithub.com/nodejs/node/pull/123/files',
	'https://togithub.com/fregante/shorten-repo-url/commit/98c6175b0cbd4caca71d24e68e57b942b0dfb549',
	'https://togithub.com/refined-github/refined-github/commit/4f270c4f50e0a2a20085a6e92095117f10340322',
	'https://togithub.com/refined-github/refined-github/commit/e81a9646b448d90c7e02ab41332cab0507dccbbd#commitcomment-60089354',
	'https://github.com/refined-github/refined-github/wiki/%22Can-you-add-this-feature%3F%22#3-it-doesnt-require-options',
	'https://github.com/refined-github/refined-github/wiki/%22Can-you-add-this-feature%3F%22#',
	'https://github.com/refined-github/refined-github/wiki/%22Can-you-add-this-feature%3F%22',
	'https://github.com/fregante/shorten-repo-url/wiki/%22Can-you-add-this-feature%3F%22',
	'https://github.com/scarf005/hangul-test/wiki/한글-위키-페이지',
	'https://github.com/scarf005/hangul-test/wiki/한글-위키-페이지#한글-헤딩',
	'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#parameters',
	'https://www.google.com/',
	'https://wwww.google.com/',
	'http://www.google.com/',
	'https://www.npmjs.com/',
	'https://www.npmjs.com/packaasdge/node',
	'https://example.com/nodejs/node/blob/cc8fc46/.gitignore',
	'https://example.site/한글로-된-URL',
	'https://한글로-된-경로.com/하위경로#한글-해시',
];

const currentLocation = 'https://github.com/fregante/shorten-repo-url/issue/1';

const urlInput = document.getElementById('url-input');
const output = document.getElementById('output');
const examplesContainer = document.getElementById('examples');

function updateOutput(url) {
	if (!url) {
		output.innerHTML = '';
		output.classList.remove('has-content');
		return;
	}

	const shortened = shortenUrl(url, currentLocation);
	
	if (shortened) {
		output.classList.add('has-content');
		output.innerHTML = `
			<div class="result">${shortened}</div>
			<div class="original">Original: ${url}</div>
		`;
	} else {
		output.classList.add('has-content');
		output.innerHTML = `
			<div class="result">Not a GitHub URL or unable to shorten</div>
			<div class="original">Original: ${url}</div>
		`;
	}
}

// Handle input changes
urlInput.addEventListener('input', (e) => {
	updateOutput(e.target.value);
});

// Initialize examples
function renderExamples() {
	// Show a subset of interesting examples
	const interestingUrls = [
		'https://github.com/nodejs/node/tree/v0.12/doc',
		'https://github.com/fregante/shorten-repo-url/blob/cc8fc46/.gitignore',
		'https://github.com/fregante/shorten-repo-url/releases/tag/v0.12.0',
		'https://github.com/fregante/shorten-repo-url/pull/123/files',
		'https://github.com/nodejs/node/labels/Please%21%20♥',
		'https://github.com/fregante/shorten-repo-url/commit/cc8fc46.diff',
		'https://raw.githubusercontent.com/nodejs/node/master/.gitignore',
		'https://github.com/sindresorhus',
		'https://github.com/fregante/shorten-repo-url/wiki/%22Can-you-add-this-feature%3F%22',
		'https://togithub.com/fregante/shorten-repo-url/issues/25',
	];

	examplesContainer.innerHTML = interestingUrls.map(url => {
		const shortened = shortenUrl(url, currentLocation);
		return `
			<div class="example">
				<div class="example-url">${url}</div>
				<div class="example-result">→ ${shortened || 'Not shortened'}</div>
			</div>
		`;
	}).join('');
}

renderExamples();
