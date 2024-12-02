# Arcade

Miscellaneous utility functions. Check out the [documentation site](https://laserware.github.io/arcade/) for available functions.

## Overview

This is a collection of utility functions commonly used in other `@laserware` (and non-`@laserware`) projects.
It's essentially a combination of "Diet Lodash", TypeScript helpers, and helper functions for performing certain tasks based on the execution environment (i.e. Node.js versus the browser).

> Why don't use just use Lodash?

Lodash is super beefy. If you don't want to ship a lot of unused extra code, you have to use [`lodash-es`](https://www.npmjs.com/package/lodash-es).
Most of Lodash's functions aren't needed anymore. [You probably don't need Lodash](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore).

> Why did you vendor some libraries instead of just installing and re-exporting them?

To avoid constantly managing dependency updates. If a library is less than 100 lines of code, I'm going to just copy the code, give props, and include the license.

> Why did you install and re-export some libraries?

For the same reason that I vendor them: to avoid constantly managing dependency updates for libraries that are used in several projects.
I just need to update it _here_ and publish a new version, then I only need to update one dependency (this one) in the affected projects.
