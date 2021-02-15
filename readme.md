# shorten-repo-url

> Shorten GitHub links like GitHub shortens Issues and Commit links. Used on [refined-github](https://github.com/sindresorhus/refined-github)

![Demo](https://user-images.githubusercontent.com/1402241/27252232-8fdf8ed0-538b-11e7-8f19-12d317c9cd32.png)

Look at [the tests](https://github.com/fregante/shorten-repo-url/blob/master/test.js) to see what each URL is shortened to. GitLab URLs are mostly compatible but they're not officially supported.

It works on any domain, so GitHub Enterprise is also supported.

## Install

```
$ npm install shorten-repo-url
```

## Usage

```js
const shortenRepoUrl = require('shorten-repo-url');

const HTML = shortenRepoUrl(
	'https://github.com/nodejs/node/tree/v0.12/doc',
	'https://github.com/nodejs/node' // same repo
);
//=> '<code>v0.12</code>' // repo-less URL

const HTML = shortenRepoUrl(
	'https://github.com/nodejs/node/tree/v0.12/doc',
	'https://github.com' // not the same repo
);
//=> 'nodejs/node@<code>v0.12</code>' // URL with repo
```

## API

### shortenRepoUrl(url, currentUrl)

Returns the shortened URL in HTML as a `string` like `nodejs/node@<code>v0.12</code>`.

#### url

Type: `string`

The GitHub URL to shorten.

#### currentUrl

Type: `string`, like `location.href`

The URL of the current page, to build relative URLs like `<code>v0.12</code>` instead of the longer `nodejs/node@<code>v0.12</code>`

### shortenRepoUrl.applyToLink(link, currentUrl)

Automatically shorten the link's text if the text matches the URL, i.e. `<a href="https://github.com">https://github.com</a>`

It will return `true` or `false` depending on whether the link was shortened.

#### link

Type: `Element`

Example: `shortenRepoUrl.applyToLink(document.querySelector(a))`

#### currentUrl

Type: `string`, like `location.href`

Same as before.

## License

MIT © [Federico Brigante](https://fregante.com)
