---
label: About
sidebar_position: 0
slug: /
---

# About

psn-api is a well-tested JavaScript library that lets you get trophy, user, and game data from the PlayStation Network.

## Features

- Tiny, less than 3Kb in size.
- No configuration needed.
- TypeScript support that "just works".
- Functions are small and UNIX-like. They do one thing and do it very well.
- Extremely well-tested: 100% coverage.

Many API wrappers for PSN provide high-level abstractions. For example, there may be a single call to authenticate, or a single call to a user's trophy list, or a single call to get game data, when in actuality there are multiple endpoints being hit on the PlayStation Network to handle all of these operations.

psn-api instead focuses on being low-level. Each function makes only one call. We believe this offers several benefits:

1. psn-api functions are small and follow a UNIX-like principle of being good at _only one thing_. This makes it easier to compose the functionality you want for your scripts and apps.
2. Open-source PSN wrappers are notorious for breaking when Sony changes something in their API. By offering low-level wrapper functions, we can more easily fix things when they change.
3. Because each function is small, they are self-supporting and work in total isolation. You only pull in the code from this library you actually need.

## Getting started

Are you starting from scratch? [Follow the starter tutorial](/get-started).

## Contact and support

- Create a [GitHub issue](https://github.com/achievements-app/psn-api/issues) for bug reports, feature requests, or questions.
- Add a ⭐️ [star on GitHub](https://github.com/achievements-app/psn-api) to support the project!

## License

This project is licensed under the [MIT license](https://github.com/achievements-app/psn-api/blob/main/LICENSE.md). psn-api is not affiliated with Sony or PlayStation in any way.
