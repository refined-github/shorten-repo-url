/// <reference lib="dom" />

import {expectType} from 'tsd';
import {applyToLink} from '.';

expectType<void>(applyToLink(new HTMLAnchorElement(), 'https://bettersite.com'));
