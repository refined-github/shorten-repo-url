/// <reference lib="dom" />

import {expectType} from 'tsd';
import {applyToLink} from '.';

// eslint-disable-next-line no-undef
expectType<void>(applyToLink(document.createElement('a'), 'https://bettersite.com'));
