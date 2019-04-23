/// <reference lib="dom" />

import {expectType} from 'tsd';
import {applyToLink} from '.';

expectType<void>(applyToLink(document.createElement('a'), 'https://bettersite.com'));
