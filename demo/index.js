import shortenUrl from '../index.js';
import {urls} from '../urls.js';

const currentLocation = 'https://github.com/fregante/shorten-repo-url/issue/1';

const urlInput = document.querySelector('#url-input');
const output = document.querySelector('#output');
const examplesContainer = document.querySelector('#examples');

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
urlInput.addEventListener('input', event => {
	updateOutput(event.target.value);
});

// Initialize examples
function renderExamples() {
	examplesContainer.innerHTML = urls.map(url => {
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
