# Arcade

Miscellaneous utility functions. Check out the [documentation site](https://laserware.github.io/arcade/) for available functions.

## Overview

This is a collection of utility functions commonly used in other `@laserware` (and non-`@laserware`) projects.
It's essentially a combination of "Diet Lodash", TypeScript helpers, and helper functions for performing certain tasks based on the execution environment (i.e. Node.js versus the browser).

The package contains a lot of random utilities that are often required in most projects once they hit a certain size.
It goes against the whole _small self-contained package that perform a single operation well_ approach prevalent in the npm universe and opts to include a jubilee of utilities.

How many times have you needed to do the following in a project?

- Turn an array into a keyed object
- Check whether your code is running in Node.js or the browser
- Check which platform your code is running on
- Use colors and extra styles when logging to the terminal
- Check if two objects or arrays contain the same values (i.e. value equality)
- Deeply merge two objects or arrays
- Format a date

This library can do all that and more! All utilities can be safely used in Node.js or the browser.
It's fully tree-shakeable, so any functions you don't use will be excluded from the bundle (if you're using ESM).

Rather than install dependencies and forward the exports, the code from the following libraries was vendored and refactored to match a common coding style:

- [camelcase](https://github.com/sindresorhus/camelcase)
- [dedent](https://github.com/dmnd/dedent)
- [deepmerge](https://github.com/TehShrike/deepmerge)
- [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal)
- [is-mergeable-object](https://github.com/TehShrike/is-mergeable-object)
- [kebab-case](https://github.com/joakimbeng/kebab-case)
- [lodash/clamp](https://github.com/lodash/lodash/blob/11eb817cdfacf56c02d7005cbe520ffbeb0fe59a/clamp.js)
- [lodash/round](https://github.com/lodash/lodash/blob/11eb817cdfacf56c02d7005cbe520ffbeb0fe59a/round.js)
- [node-dateformat](https://github.com/felixge/node-dateformat)
- [typescript-event-target](https://github.com/DerZade/typescript-event-target)
