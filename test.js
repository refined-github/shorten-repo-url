import test from 'ava';
import shortenUrl from '.';

function urlMatcherMacro(t, locations, shouldMatch = []) {
	for (const [expected, ...urls] of shouldMatch) {
		for (const index of locations.keys()) {
			if (urls[index] !== false) {
				t.is(shortenUrl(urls[index], locations[index]), expected);
			}
		}
	}
}

// Tests are done using each of these as the currentUrl
const supportedDomains = [
	'https://github.com/bfred-it/shorten-repo-url/issue/1',
	'https://gitlab.com/bfred-it/shorten-repo-url/issue/1',
];

// URLs are made up, but their structure must be real.
// Some URLs may be skipped with `false` if they require complex code changes.
// Format is [expected, domain1url, ..., domainNurl]
const expectedPairs = [
	[
		'bfred-it/shorten-repo-url',
		'https://github.com/bfred-it/shorten-repo-url/',
		'https://gitlab.com/bfred-it/shorten-repo-url/',
	],
	[
		'<code>v0.12</code>',
		'https://github.com/bfred-it/shorten-repo-url/tree/v0.12',
		'https://gitlab.com/bfred-it/shorten-repo-url/tree/v0.12',
	],
	[
		'<code>d71718d</code>',
		'https://github.com/bfred-it/shorten-repo-url/tree/d71718db6aa4feb8dc10edbad1134472468e971a',
		'https://gitlab.com/bfred-it/shorten-repo-url/tree/d71718db6aa4feb8dc10edbad1134472468e971a',
	],
	[
		'nodejs/node',
		'https://github.com/nodejs/node/',
		'https://gitlab.com/nodejs/node/',
	],
	[
		'nodejs/node@<code>v0.12</code>',
		'https://github.com/nodejs/node/tree/v0.12',
		'https://gitlab.com/nodejs/node/tree/v0.12',
	],
	[
		'nodejs/node@<code>d71718d</code>',
		'https://github.com/nodejs/node/tree/d71718db6aa4feb8dc10edbad1134472468e971a',
		'https://gitlab.com/nodejs/node/tree/d71718db6aa4feb8dc10edbad1134472468e971a',
	],
	[
		'/doc@<code>master</code>',
		'https://github.com/bfred-it/shorten-repo-url/tree/master/doc',
		'https://gitlab.com/bfred-it/shorten-repo-url/tree/master/doc',
	],
	[
		'/doc@<code>v0.12</code>',
		'https://github.com/bfred-it/shorten-repo-url/tree/v0.12/doc',
		'https://gitlab.com/bfred-it/shorten-repo-url/tree/v0.12/doc',
	],
	[
		'/doc@<code>d71718d</code>',
		'https://github.com/bfred-it/shorten-repo-url/tree/d71718db6aa4feb8dc10edbad1134472468e971a/doc',
		'https://gitlab.com/bfred-it/shorten-repo-url/tree/d71718db6aa4feb8dc10edbad1134472468e971a/doc',
	],
	[
		'nodejs/node:doc@<code>master</code>',
		'https://github.com/nodejs/node/tree/master/doc',
		'https://gitlab.com/nodejs/node/tree/master/doc',
	],
	[
		'nodejs/node:doc@<code>v0.12</code>',
		'https://github.com/nodejs/node/tree/v0.12/doc',
		'https://gitlab.com/nodejs/node/tree/v0.12/doc',
	],
	[
		'nodejs/node:doc@<code>d71718d</code>',
		'https://github.com/nodejs/node/tree/d71718db6aa4feb8dc10edbad1134472468e971a/doc',
		'https://gitlab.com/nodejs/node/tree/d71718db6aa4feb8dc10edbad1134472468e971a/doc',
	],
	[
		'/.gitignore@<code>master</code>',
		'https://github.com/bfred-it/shorten-repo-url/blob/master/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/blob/master/.gitignore',
	],
	[
		'/.gitignore@<code>v0.12</code>',
		'https://github.com/bfred-it/shorten-repo-url/blob/v0.12/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/blob/v0.12/.gitignore',
	],
	[
		'/.gitignore@<code>cc8fc46</code>',
		'https://github.com/bfred-it/shorten-repo-url/blob/cc8fc46/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/blob/cc8fc46/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>master</code>',
		'https://github.com/nodejs/node/blob/master/.gitignore',
		'https://gitlab.com/nodejs/node/blob/master/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>v0.12</code>',
		'https://github.com/nodejs/node/blob/v0.12/.gitignore',
		'https://gitlab.com/nodejs/node/blob/v0.12/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>cc8fc46</code>',
		'https://github.com/nodejs/node/blob/cc8fc46/.gitignore',
		'https://gitlab.com/nodejs/node/blob/cc8fc46/.gitignore',
	],
	[
		'/.gitignore@<code>master</code> (blame)',
		'https://github.com/bfred-it/shorten-repo-url/blame/master/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/blame/master/.gitignore',
	],
	[
		'/.gitignore@<code>v0.12</code> (blame)',
		'https://github.com/bfred-it/shorten-repo-url/blame/v0.12/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/blame/v0.12/.gitignore',
	],
	[
		'/.gitignore@<code>cc8fc46</code> (blame)',
		'https://github.com/bfred-it/shorten-repo-url/blame/cc8fc46/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/blame/cc8fc46/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>master</code> (blame)',
		'https://github.com/nodejs/node/blame/master/.gitignore',
		'https://gitlab.com/nodejs/node/blame/master/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>v0.12</code> (blame)',
		'https://github.com/nodejs/node/blame/v0.12/.gitignore',
		'https://gitlab.com/nodejs/node/blame/v0.12/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>cc8fc46</code> (blame)',
		'https://github.com/nodejs/node/blame/cc8fc46/.gitignore',
		'https://gitlab.com/nodejs/node/blame/cc8fc46/.gitignore',
	],
	[
		'/.gitignore@<code>master</code> (commits)',
		'https://github.com/bfred-it/shorten-repo-url/commits/master/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/commits/master/.gitignore',
	],
	[
		'/.gitignore@<code>v0.12</code> (commits)',
		'https://github.com/bfred-it/shorten-repo-url/commits/v0.12/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/commits/v0.12/.gitignore',
	],
	[
		'/.gitignore@<code>cc8fc46</code> (commits)',
		'https://github.com/bfred-it/shorten-repo-url/commits/cc8fc46/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/commits/cc8fc46/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>master</code> (commits)',
		'https://github.com/nodejs/node/commits/master/.gitignore',
		'https://gitlab.com/nodejs/node/commits/master/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>v0.12</code> (commits)',
		'https://github.com/nodejs/node/commits/v0.12/.gitignore',
		'https://gitlab.com/nodejs/node/commits/v0.12/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>cc8fc46</code> (commits)',
		'https://github.com/nodejs/node/commits/cc8fc46/.gitignore',
		'https://gitlab.com/nodejs/node/commits/cc8fc46/.gitignore',
	],
	[
		'<code>cc8fc46</code>.diff',
		'https://github.com/bfred-it/shorten-repo-url/commit/cc8fc46.diff',
		'https://gitlab.com/bfred-it/shorten-repo-url/commit/cc8fc46.diff',
	],
	[
		'<code>cc8fc46</code>.patch',
		'https://github.com/bfred-it/shorten-repo-url/commit/cc8fc46.patch',
		'https://gitlab.com/bfred-it/shorten-repo-url/commit/cc8fc46.patch',
	],
	[
		'nodejs/node@<code>cc8fc46</code>.diff',
		'https://github.com/nodejs/node/commit/cc8fc46.diff',
		'https://gitlab.com/nodejs/node/commit/cc8fc46.diff',
	],
	[
		'nodejs/node@<code>cc8fc46</code>.patch',
		'https://github.com/nodejs/node/commit/cc8fc46.patch',
		'https://gitlab.com/nodejs/node/commit/cc8fc46.patch',
	],
	[
		'<code>v0.12.0</code> (release)',
		'https://github.com/bfred-it/shorten-repo-url/releases/tag/v0.12.0',
		'https://gitlab.com/bfred-it/shorten-repo-url/tags/v0.12.0',
	],
	[
		'nodejs/node@<code>v0.12.0</code> (release)',
		'https://github.com/nodejs/node/releases/tag/v0.12.0',
		'https://gitlab.com/nodejs/node/tags/v0.12.0',
	],
	[
		'bfred-it/shorten-repo-url/milestone/25',
		'https://github.com/bfred-it/shorten-repo-url/milestone/25',
		false, // GH is not shortened either https://gitlab.com/bfred-it/shorten-repo-url/milestones/25
	],
	[
		'nodejs/node/milestone/25',
		'https://github.com/nodejs/node/milestone/25',
		false,
	],
	[
		'npm (label)',
		'https://github.com/bfred-it/shorten-repo-url/labels/npm',
		false, // https://gitlab.com/gitlab-org/gitlab-ce/issues?label_name%5B%5D=yo
	],
	[
		'nodejs/node/npm (label)',
		'https://github.com/nodejs/node/labels/npm',
		false,
	],
	[
		'<code>6.4.1</code>.zip',
		'https://github.com/bfred-it/shorten-repo-url/archive/6.4.1.zip',
		false, // https://gitlab.com/gitlab-org/gitlab-ce/repository/archive.zip?ref=v9.3.0
	],
	[
		'<code>6.4.1</code> now-macos (download)',
		'https://github.com/bfred-it/shorten-repo-url/releases/download/6.4.1/now-macos',
		false,
	],
	[
		'zeit/now-cli@<code>6.4.1</code>.zip',
		'https://github.com/zeit/now-cli/archive/6.4.1.zip',
		false,
	],
	[
		'zeit/now-cli@<code>6.4.1</code> now-macos (download)',
		'https://github.com/zeit/now-cli/releases/download/6.4.1/now-macos',
		false,
	],
	[
		'bfred-it/shorten-repo-url/wiki',
		'https://github.com/bfred-it/shorten-repo-url/wiki',
		false,
	],
	[
		'bfred-it/shorten-repo-url/pulse',
		'https://github.com/bfred-it/shorten-repo-url/pulse',
		false,
	],
	[
		'bfred-it/shorten-repo-url/labels',
		'https://github.com/bfred-it/shorten-repo-url/labels',
		'https://gitlab.com/bfred-it/shorten-repo-url/labels',
	],
	[
		'bfred-it/shorten-repo-url/network',
		'https://github.com/bfred-it/shorten-repo-url/network',
		false,
	],
	[
		'bfred-it/shorten-repo-url/projects',
		'https://github.com/bfred-it/shorten-repo-url/projects',
		false,
	],
	[
		'bfred-it/shorten-repo-url/boards',
		false,
		'https://gitlab.com/bfred-it/shorten-repo-url/boards',
	],
	[
		'bfred-it/shorten-repo-url/releases',
		'https://github.com/bfred-it/shorten-repo-url/releases',
		false,
	],
	[
		'bfred-it/shorten-repo-url/milestones',
		'https://github.com/bfred-it/shorten-repo-url/milestones',
		'https://gitlab.com/bfred-it/shorten-repo-url/milestones',
	],
	[
		'bfred-it/shorten-repo-url/contributors',
		'https://github.com/bfred-it/shorten-repo-url/contributors',
		false,
	],
	[
		'nodejs/node/wiki',
		'https://github.com/nodejs/node/wiki',
		false,
	],
	[
		'nodejs/node/pulse',
		'https://github.com/nodejs/node/pulse',
		false,
	],
	[
		'nodejs/node/labels',
		'https://github.com/nodejs/node/labels',
		'https://gitlab.com/nodejs/node/labels',
	],
	[
		'nodejs/node/network',
		'https://github.com/nodejs/node/network',
		false,
	],
	[
		'nodejs/node/projects',
		'https://github.com/nodejs/node/projects',
		false,
	],
	[
		'nodejs/node/boards',
		false,
		'https://gitlab.com/nodejs/node/boards',
	],
	[
		'nodejs/node/releases',
		'https://github.com/nodejs/node/releases',
		false,
	],
	[
		'nodejs/node/milestones',
		'https://github.com/nodejs/node/milestones',
		'https://gitlab.com/nodejs/node/milestones',
	],
	[
		'nodejs/node/contributors',
		'https://github.com/nodejs/node/contributors',
		false,
	],
	[
		'/.gitignore@<code>master</code> (raw)',
		'https://rawgit.com/bfred-it/shorten-repo-url/master/.gitignore',
		false,
	],
	[
		'/.gitignore@<code>v0.12</code> (raw)',
		'https://cdn.rawgit.com/bfred-it/shorten-repo-url/v0.12/.gitignore',
		false,
	],
	[
		'/.gitignore@<code>d71718db</code> (raw)',
		'https://cdn.rawgit.com/bfred-it/shorten-repo-url/d71718db/.gitignore',
		false,
	],
	[
		'/.gitignore@<code>master</code> (raw)',
		'https://raw.githubusercontent.com/bfred-it/shorten-repo-url/master/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/raw/master/.gitignore',
	],
	[
		'/.gitignore@<code>v0.12</code> (raw)',
		'https://raw.githubusercontent.com/bfred-it/shorten-repo-url/v0.12/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/raw/v0.12/.gitignore',
	],
	[
		'/.gitignore@<code>d71718db</code> (raw)',
		'https://raw.githubusercontent.com/bfred-it/shorten-repo-url/d71718db/.gitignore',
		'https://gitlab.com/bfred-it/shorten-repo-url/raw/d71718db/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>master</code> (raw)',
		'https://rawgit.com/nodejs/node/master/.gitignore',
		false,
	],
	[
		'nodejs/node:.gitignore@<code>v0.12</code> (raw)',
		'https://cdn.rawgit.com/nodejs/node/v0.12/.gitignore',
		false,
	],
	[
		'nodejs/node:.gitignore@<code>d71718db</code> (raw)',
		'https://cdn.rawgit.com/nodejs/node/d71718db/.gitignore',
		false,
	],
	[
		'nodejs/node:.gitignore@<code>master</code> (raw)',
		'https://raw.githubusercontent.com/nodejs/node/master/.gitignore',
		'https://gitlab.com/nodejs/node/raw/master/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>v0.12</code> (raw)',
		'https://raw.githubusercontent.com/nodejs/node/v0.12/.gitignore',
		'https://gitlab.com/nodejs/node/raw/v0.12/.gitignore',
	],
	[
		'nodejs/node:.gitignore@<code>d71718db</code> (raw)',
		'https://raw.githubusercontent.com/nodejs/node/d71718db/.gitignore',
		'https://gitlab.com/nodejs/node/raw/d71718db/.gitignore',
	],
	[
		'@sindresorhus',
		'https://github.com/sindresorhus',
		'https://gitlab.com/sindresorhus',
	],
	[
		'@nodejs',
		'https://github.com/nodejs',
		'https://gitlab.com/nodejs',
	],
	[
		'github.com/pulls',
		'https://github.com/pulls',
		false,
	],
	[
		'github.com/issues',
		'https://github.com/issues',
		false,
	],
	[
		'github.com/trending',
		'https://github.com/trending',
		false,
	],
	[
		'github.com/features',
		'https://github.com/features',
		false,
	],
	[
		'github.com/marketplace',
		'https://github.com/marketplace',
		false,
	],
	[
		'github.com/trending/developers',
		'https://github.com/trending/developers',
		false,
	],
	[
		'github.com/settings/profile',
		'https://github.com/settings/profile',
		false,
	],
	[
		'npmjs.com',
		'https://www.npmjs.com/',
		'https://www.npmjs.com/',
	],
	[
		'npmjs.com/package/node',
		'https://www.npmjs.com/package/node',
		'https://www.npmjs.com/package/node',
	],
	[
		'example.com/nodejs/node/blob/cc8fc46/.gitignore',
		'https://example.com/nodejs/node/blob/cc8fc46/.gitignore',
		'https://example.com/nodejs/node/blob/cc8fc46/.gitignore',
	],
];

test(urlMatcherMacro, supportedDomains, expectedPairs);
