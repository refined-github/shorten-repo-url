/**
Shortens a GitHub URL string.

@param anchor An HTMLAnchorElement
@param url The GitHub URL to shorten.
@returns The shortened URL in HTML as a string
@example https://github.com/nodejs/node/tree/v0.12/doc becomes nodejs/node@<code>v0.12</code>

*/
export default function shortenRepoUrl(url: string, currentUrl?: string): string;

/**
Shortens a GitHub URL in a DOM anchor if the link label is not customized (i.e. if the `href` matches the `textContent`)

@param anchor An HTMLAnchorElement
@param url The GitHub URL to shorten.
@example<a href="https://github.com">https://github.com</a> becomes <a href="https://github.com">github.com</a>

*/
export function applyToLink(anchor: HTMLAnchorElement, url?: string): void;
