import test from 'ava';
import shortenUrl from './index.js';

const currentLocation = 'https://github.com/fregante/shorten-repo-url/issue/1';

function urlMatcherMacro(t, shouldMatch = []) {
	for (const [originalUrl, expectedShortenedUrl] of shouldMatch) {
		t.is(shortenUrl(originalUrl, currentLocation), expectedShortenedUrl);
	}
}

test('GitHub.com URLs', urlMatcherMacro, new Map([
	[
		'https://github.com/fregante/shorten-repo-url/',
		'fregante/shorten-repo-url',
	],
	[
		'https://github.com/fregante/shorten-repo-url/?tab=readme-ov-file',
		'fregante/shorten-repo-url',
	],
	[
		'https://github.com/fregante/shorten-repo-url/tree/v0.12',
		'<code>v0.12</code>',
	],
	[
		'https://github.com/fregante/shorten-repo-url/tree/d71718db6aa4feb8dc10edbad1134472468e971a',
		'<code>d71718d</code>',
	],
	[
		'https://github.com/nodejs/node/',
		'nodejs/node',
	],
	[
		'https://github.com/nodejs/shorten-repo-url/',
		'nodejs/shorten-repo-url',
	],
	[
		'https://github.com/nodejs/node/tree/v0.12',
		'nodejs/node@<code>v0.12</code>',
	],
	[
		'https://github.com/nodejs/node/tree/d71718db6aa4feb8dc10edbad1134472468e971a',
		'nodejs/node@<code>d71718d</code>',
	],
	[
		'https://github.com/fregante/shorten-repo-url/tree/master/doc',
		'<code>master</code>/doc',
	],
	[
		'https://github.com/fregante/shorten-repo-url/tree/v0.12/doc',
		'<code>v0.12</code>/doc',
	],
	[
		'https://github.com/fregante/shorten-repo-url/tree/d71718db6aa4feb8dc10edbad1134472468e971a/doc',
		'<code>d71718d</code>/doc',
	],
	[
		'https://github.com/nodejs/node/tree/master/doc',
		'nodejs/node@<code>master</code>/doc',
	],
	[
		'https://github.com/nodejs/node/tree/v0.12/doc',
		'nodejs/node@<code>v0.12</code>/doc',
	],
	[
		'https://github.com/nodejs/node/tree/d71718db6aa4feb8dc10edbad1134472468e971a/doc',
		'nodejs/node@<code>d71718d</code>/doc',
	],
	[
		'https://github.com/fregante/shorten-repo-url/blob/master/.gitignore',
		'<code>master</code>/.gitignore',
	],
	[
		'https://github.com/fregante/shorten-repo-url/blob/v0.12/.gitignore',
		'<code>v0.12</code>/.gitignore',
	],
	[
		'https://github.com/fregante/shorten-repo-url/blob/cc8fc46/.gitignore',
		'<code>cc8fc46</code>/.gitignore',
	],
	[
		'https://github.com/nodejs/node/blob/master/.gitignore',
		'nodejs/node@<code>master</code>/.gitignore',
	],
	[
		'https://github.com/nodejs/node/blob/v0.12/.gitignore',
		'nodejs/node@<code>v0.12</code>/.gitignore',
	],
	[
		'https://github.com/nodejs/node/blob/cc8fc46/.gitignore',
		'nodejs/node@<code>cc8fc46</code>/.gitignore',
	],
	[
		'https://github.com/fregante/shorten-repo-url/blame/master/.gitignore',
		'<code>master</code>/.gitignore (blame)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/blame/v0.12/.gitignore',
		'<code>v0.12</code>/.gitignore (blame)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/blame/cc8fc46/.gitignore',
		'<code>cc8fc46</code>/.gitignore (blame)',
	],
	[
		'https://github.com/nodejs/node/blame/master/.gitignore',
		'nodejs/node@<code>master</code>/.gitignore (blame)',
	],
	[
		'https://github.com/nodejs/node/blame/v0.12/.gitignore',
		'nodejs/node@<code>v0.12</code>/.gitignore (blame)',
	],
	[
		'https://github.com/nodejs/node/blame/cc8fc46/.gitignore',
		'nodejs/node@<code>cc8fc46</code>/.gitignore (blame)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/commits/master/.gitignore',
		'<code>master</code>/.gitignore (commits)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/commits/v0.12/.gitignore',
		'<code>v0.12</code>/.gitignore (commits)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/commits/cc8fc46/.gitignore',
		'<code>cc8fc46</code>/.gitignore (commits)',
	],
	[
		'https://github.com/nodejs/node/commits/master/.gitignore',
		'nodejs/node@<code>master</code>/.gitignore (commits)',
	],
	[
		'https://github.com/nodejs/node/commits/v0.12/.gitignore',
		'nodejs/node@<code>v0.12</code>/.gitignore (commits)',
	],
	[
		'https://github.com/nodejs/node/commits/cc8fc46/.gitignore',
		'nodejs/node@<code>cc8fc46</code>/.gitignore (commits)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/commit/cc8fc46.diff',
		'<code>cc8fc46</code>.diff',
	],
	[
		'https://github.com/fregante/shorten-repo-url/commit/cc8fc46.patch',
		'<code>cc8fc46</code>.patch',
	],
	[
		'https://github.com/nodejs/node/commit/cc8fc46.diff',
		'nodejs/node@<code>cc8fc46</code>.diff',
	],
	[
		'https://github.com/nodejs/node/commit/cc8fc46.patch',
		'nodejs/node@<code>cc8fc46</code>.patch',
	],
	[
		'https://github.com/fregante/shorten-repo-url/releases/tag/v0.12.0',
		'<code>v0.12.0</code> (release)',
	],
	[
		'https://github.com/nodejs/node/releases/tag/v0.12.0',
		'nodejs/node@<code>v0.12.0</code> (release)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/milestone/25',
		'fregante/shorten-repo-url/milestone/25',
	],
	[
		'https://github.com/fregante/shorten-repo-url/compare/d71718db6aa4feb8dc10edbad1134472468e971a',
		'<code>d71718d</code> (compare)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/compare/master',
		'<code>master</code> (compare)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/compare/master...master',
		'<code>master...master</code> (compare)',
	],
	[
		'https://github.com/nodejs/node/compare/d71718db6aa4feb8dc10edbad1134472468e971a',
		'nodejs/node@<code>d71718d</code> (compare)',
	],
	[
		'https://github.com/nodejs/node/compare/master',
		'nodejs/node@<code>master</code> (compare)',
	],
	[
		'https://github.com/nodejs/node/compare/master...master',
		'nodejs/node@<code>master...master</code> (compare)',
	],
	[
		'https://github.com/nodejs/node/milestone/25',
		'nodejs/node/milestone/25',
	],
	[
		'https://github.com/fregante/shorten-repo-url/labels/npm',
		'npm (label)',
	],
	[
		'https://github.com/nodejs/node/labels/npm',
		'nodejs/node/npm (label)',
	],
	[
		'https://github.com/nodejs/node/labels/Please%21%20♥',
		'nodejs/node/Please! ♥ (label)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/archive/6.4.1.zip',
		'<code>6.4.1</code>.zip',
	],
	[
		'https://github.com/fregante/shorten-repo-url/releases/download/6.4.1/now-macos',
		'<code>6.4.1</code> now-macos (download)',
	],
	[
		'https://github.com/zeit/now-cli/archive/6.4.1.zip',
		'zeit/now-cli@<code>6.4.1</code>.zip',
	],
	[
		'https://github.com/zeit/now-cli/releases/download/6.4.1/now-macos',
		'zeit/now-cli@<code>6.4.1</code> now-macos (download)',
	],
	[
		'https://github.com/bfred-it/shorten-repo-url/network/dependents',
		'bfred-it/shorten-repo-url (dependents)',
	],
	[
		'https://github.com/bfred-it/shorten-repo-url/network/dependencies',
		'bfred-it/shorten-repo-url (dependencies)',
	],
	[
		'https://github.com/network/dependencies',
		'github.com/network/dependencies',
	], // Tricky
	[
		'https://github.com/bfred-it/shorten-repo-url/wiki',
		'bfred-it/shorten-repo-url/wiki',
	],
	[
		'https://github.com/fregante/shorten-repo-url/pulse',
		'fregante/shorten-repo-url/pulse',
	],
	[
		'https://github.com/fregante/shorten-repo-url/labels',
		'fregante/shorten-repo-url/labels',
	],
	[
		'https://github.com/fregante/shorten-repo-url/compare',
		'fregante/shorten-repo-url/compare',
	],
	[
		'https://github.com/fregante/shorten-repo-url/network',
		'fregante/shorten-repo-url/network',
	],
	[
		'https://github.com/fregante/shorten-repo-url/projects',
		'fregante/shorten-repo-url/projects',
	],
	[
		'https://github.com/fregante/shorten-repo-url/releases',
		'fregante/shorten-repo-url/releases',
	],
	[
		'https://github.com/fregante/shorten-repo-url/milestones',
		'fregante/shorten-repo-url/milestones',
	],
	[
		'https://github.com/fregante/shorten-repo-url/contributors',
		'fregante/shorten-repo-url/contributors',
	],
	[
		'https://github.com/fregante/shorten-repo-url/pull/123/files',
		'#123 (files)',
	],
	[
		'https://github.com/nodejs/node/pull/123/files',
		'nodejs/node#123 (files)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/pull/123/commits',
		'#123 (commits)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/pull/123/checks',
		'#123 (checks)',
	],
	[
		'https://github.com/nodejs/node/wiki',
		'nodejs/node/wiki',
	],
	[
		'https://github.com/nodejs/node/pulse',
		'nodejs/node/pulse',
	],
	[
		'https://github.com/nodejs/node/labels',
		'nodejs/node/labels',
	],
	[
		'https://github.com/nodejs/node/compare',
		'nodejs/node/compare',
	],
	[
		'https://github.com/nodejs/node/network',
		'nodejs/node/network',
	],
	[
		'https://github.com/nodejs/node/projects',
		'nodejs/node/projects',
	],
	[
		'https://github.com/nodejs/node/releases',
		'nodejs/node/releases',
	],
	[
		'https://github.com/nodejs/node/milestones',
		'nodejs/node/milestones',
	],
	[
		'https://github.com/nodejs/node/contributors',
		'nodejs/node/contributors',
	],
	[
		'https://github.com/nodejs/node/graphs/commit-activity',
		'nodejs/node/graphs/commit-activity',
	],
	[
		'https://rawgit.com/fregante/shorten-repo-url/master/.gitignore',
		'<code>master</code>/.gitignore (raw)',
	],
	[
		'https://cdn.rawgit.com/fregante/shorten-repo-url/v0.12/.gitignore',
		'<code>v0.12</code>/.gitignore (raw)',
	],
	[
		'https://cdn.rawgit.com/fregante/shorten-repo-url/d71718db/.gitignore',
		'<code>d71718db</code>/.gitignore (raw)',
	],
	[
		'https://raw.githubusercontent.com/fregante/shorten-repo-url/master/.gitignore',
		'<code>master</code>/.gitignore (raw)',
	],
	[
		'https://raw.githubusercontent.com/fregante/shorten-repo-url/v0.12/.gitignore',
		'<code>v0.12</code>/.gitignore (raw)',
	],
	[
		'https://raw.githubusercontent.com/fregante/shorten-repo-url/d71718db/.gitignore',
		'<code>d71718db</code>/.gitignore (raw)',
	],
	[
		'https://rawgit.com/nodejs/node/master/.gitignore',
		'nodejs/node@<code>master</code>/.gitignore (raw)',
	],
	[
		'https://cdn.rawgit.com/nodejs/node/v0.12/.gitignore',
		'nodejs/node@<code>v0.12</code>/.gitignore (raw)',
	],
	[
		'https://cdn.rawgit.com/nodejs/node/d71718db/.gitignore',
		'nodejs/node@<code>d71718db</code>/.gitignore (raw)',
	],
	[
		'https://raw.githubusercontent.com/nodejs/node/master/.gitignore',
		'nodejs/node@<code>master</code>/.gitignore (raw)',
	],
	[
		'https://raw.githubusercontent.com/nodejs/node/v0.12/.gitignore',
		'nodejs/node@<code>v0.12</code>/.gitignore (raw)',
	],
	[
		'https://raw.githubusercontent.com/nodejs/node/d71718db/.gitignore',
		'nodejs/node@<code>d71718db</code>/.gitignore (raw)',
	],
	[
		'https://github.com/sindresorhus',
		'@sindresorhus',
	],
	[
		'https://github.com/nodejs',
		'@nodejs',
	],
	[
		'https://github.com/pulls',
		'github.com/pulls',
	],
	[
		'https://github.com/issues',
		'github.com/issues',
	],
	[
		'https://github.com/trending',
		'github.com/trending',
	],
	[
		'https://github.com/features',
		'github.com/features',
	],
	[
		'https://github.com/marketplace',
		'github.com/marketplace',
	],
	[
		'https://github.com/trending/developers',
		'github.com/trending/developers',
	],
	[
		'https://github.com/settings/profile',
		'github.com/settings/profile',
	],
	[
		'https://www.npmjs.com/',
		'npmjs.com',
	],
	[
		'https://www.npmjs.com/package/node',
		'npmjs.com/package/node',
	],
	[
		'https://example.com/nodejs/node/blob/cc8fc46/.gitignore',
		'example.com/nodejs/node/blob/cc8fc46/.gitignore',
	],
	[
		'https://github.com/',
		'github.com',
	],
	[
		'https://github.com/fregante/shorten-repo-url/issues',
		'fregante/shorten-repo-url/issues',
	],
	[
		'https://github.com/fregante/shorten-repo-url/issues?q=wow',
		'fregante/shorten-repo-url/issues (wow)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/issues?q=is%3Aissue++is%3Aopen+sort%3Aupdated-desc+&unrelated=true',
		'fregante/shorten-repo-url/issues?unrelated=true (is:open sort:updated-desc)',
	],
	[
		'https://github.com/issues?q=is%3Aissue++is%3Aopen+sort%3Aupdated-desc+&unrelated=true',
		'github.com/issues?unrelated=true (is:open sort:updated-desc)',
	],
	[
		'https://github.com/pulls?q=is%3Apr++is%3Aopen+sort%3Aupdated-desc+&unrelated=true',
		'github.com/pulls?unrelated=true (is:open sort:updated-desc)',
	],
	[
		'https://github.com/sindresorhus/notifier-for-github/pull/253/files/6b4489d417c9425dc27c5fb8d6b4a8518debd035..60cdcf3c3646164441bf8f037cef620479cdec59',
		'<code>6b4489d4..60cdcf3c</code> (#253)',
	],
	[
		'https://togithub.com/fregante/shorten-repo-url/issues/25',
		'#25',
	],
	[
		'https://togithub.com/fregante/shorten-repo-url/issues/28#issue-850900171',
		'#28 (comment)',
	],
	[
		'https://togithub.com/fregante/shorten-repo-url/pull/32',
		'#32',
	],
	[
		'https://togithub.com/fregante/shorten-repo-url/pull/32/files',
		'#32 (files)',
	],
	[
		'https://togithub.com/fregante/shorten-repo-url/pull/33#pullrequestreview-801229042',
		'#33 (review)',
	],
	[
		'https://togithub.com/fregante/shorten-repo-url/pull/33#discussion_r750069394',
		'#33 (review)',
	],
	[
		'https://togithub.com/nodejs/node/pull/123',
		'nodejs/node#123',
	],
	[
		'https://togithub.com/nodejs/node/pull/123/files',
		'nodejs/node#123 (files)',
	],
	[
		'https://togithub.com/fregante/shorten-repo-url/commit/98c6175b0cbd4caca71d24e68e57b942b0dfb549',
		'<code>98c6175</code>',
	],
	[
		'https://togithub.com/refined-github/refined-github/commit/4f270c4f50e0a2a20085a6e92095117f10340322',
		'refined-github/refined-github@<code>4f270c4</code>',
	],
	[
		'https://togithub.com/refined-github/refined-github/commit/e81a9646b448d90c7e02ab41332cab0507dccbbd#commitcomment-60089354',
		'refined-github/refined-github@<code>e81a964</code> (comment)',
	],
	[
		'https://github.com/refined-github/refined-github/wiki/%22Can-you-add-this-feature%3F%22#3-it-doesnt-require-options',
		'Wiki: "Can you add this feature?" (3 it doesnt require options) (refined-github/refined-github)',
	],
	[
		'https://github.com/refined-github/refined-github/wiki/%22Can-you-add-this-feature%3F%22#',
		'Wiki: "Can you add this feature?" (refined-github/refined-github)',
	],
	[
		'https://github.com/refined-github/refined-github/wiki/%22Can-you-add-this-feature%3F%22',
		'Wiki: "Can you add this feature?" (refined-github/refined-github)',
	],
	[
		'https://github.com/fregante/shorten-repo-url/wiki/%22Can-you-add-this-feature%3F%22',
		'Wiki: "Can you add this feature?"',
	],
]));
