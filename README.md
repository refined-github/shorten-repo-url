# shorten-repo-url [![Build Status](https://travis-ci.org/bfred-it/shorten-repo-url.svg?branch=master)](https://travis-ci.org/bfred-it/shorten-repo-url)

> Shorten GitHub links like GitHub shortens Issues and Commit links. Used on [refined-github](https://github.com/sindresorhus/refined-github)

![Demo](https://user-images.githubusercontent.com/1402241/27252232-8fdf8ed0-538b-11e7-8f19-12d317c9cd32.png)

Look at [the tests](https://github.com/bfred-it/shorten-repo-url/blob/master/test.js) to see what each URL is shortened to. GitLab URLs are untested but they seem compatible. PRs welcome to add support/tests for GitLab and BitBucket URLs.


## Install

```
$ npm install --save shorten-repo-url
```


## Usage

```js
const shortenRepoUrl = require('shorten-repo-url');

const HTML = shortenRepoUrl('https://github.com/nodejs/node/tree/v0.12/doc');
//=> 'nodejs/node@<code>v0.12</code>'
```


## API

### shortenRepoUrl(url)

Returns the shortened URL in HTML as a `string` like `nodejs/node@<code>v0.12</code>`.

#### url

Type: `string`

The GitHub URL to shorten.

### shortenRepoUrl.applyToLink(link)

Type: `Element`

Example: `shortenRepoUrl.applyToLink(document.querySelector(a))`

Automatically shorten the link's text if the text matches the URL, i.e. `<a href="https://github.com">https://github.com</a>`


## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)

