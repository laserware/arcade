# Arcade

Miscellaneous utility functions.

## Overview

This is a collection of utility functions commonly used in other `@laserware` (and non-`@laserware`) projects.
It's essentially a combination of "Diet Lodash", TypeScript helpers, and helper functions for performing certain tasks based on the execution environment (i.e. Node.js versus the browser).

> Why don't use just use Lodash?

Lodash is super beefy. If you don't want to ship a lot of unused extra code, you have to use [`lodash-es`](https://www.npmjs.com/package/lodash-es).
Most of Lodash's functions aren't needed anymore. [You probably don't need Lodash](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore).

> Why did you vendor some libraries instead of just installing and re-exporting them?

I have grown weary of constantly managing dependency updates. If a library is less than 100 lines of code, I'm going to just copy the code, give props, and include the license.
