/**
 * Shortens a GitHub URL.
 *
 * @param anchor An HTMLAnchorElement
 * @param url The GitHub URL to shorten.
 *
 * @returns The shortened URL in HTML as a string
 *
 * @example https://github.com/nodejs/node/tree/v0.12/doc becomes nodejs/node@<code>v0.12</code>
 *
 */
export function applyToLink(anchor: HTMLAnchorElement, url: string): void;
