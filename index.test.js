import {test, expect} from 'vitest';
import {Window} from 'happy-dom';
import {urls} from './urls.js';
import shortenUrl, {applyToLink} from './index.js';

const currentLocation = 'https://github.com/fregante/shorten-repo-url/issue/1';
globalThis.document = new Window({url: currentLocation}).document;

expect.addSnapshotSerializer({
	serialize(value) {
		return value;
	},
	test(value) {
		return value;
	},
});

test.each(urls)('%s', url => {
	const shortened = shortenUrl(url, currentLocation);
	expect(shortened).toMatchSnapshot();

	const a = document.createElement('a');
	a.href = url;

	// The URL might contain CJK characters, but after it's passed to a.href it's encoded
	const correctlyEncodedUrl = a.href;

	a.textContent = url;
	applyToLink(a, currentLocation);
	expect(a.href, 'applyToLink should not alter the href').toBe(correctlyEncodedUrl);
	expect(a.innerHTML).toBe(shortened);
});

