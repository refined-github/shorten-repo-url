import {expectType} from 'tsd';
import {applyToLink} from './index.js';

expectType<void>(
	applyToLink(document.createElement('a'), 'https://bettersite.com'),
);
