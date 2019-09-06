/**
Shortens a GitHub URL string.

@param anchor An HTMLAnchorElement
@param url The GitHub URL to shorten.
@returns The shortened URL in HTML as a string
@example https://github.com/nodejs/node/tree/v0.12/doc becomes nodejs/node@<code>v0.12</code>

*/
declare function shortenRepoUrl(url: string, currentUrl?: string): string;

declare namespace shortenRepoUrl {
	/**
	Shortens a GitHub URL in a DOM anchor.

	@param anchor An HTMLAnchorElement
	@param url The GitHub URL to shorten.
	@example https://github.com/nodejs/node/tree/v0.12/doc becomes nodejs/node@<code>v0.12</code>

	*/
	var applyToLink: (anchor: HTMLAnchorElement, url?: string) => void;
}
export = shortenRepoUrl;
