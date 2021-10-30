<p align="center">
  <img width="40%" height="40%" src="psx.png" />
</p>

# psn-api

> A low-level API for getting trophy data from the PlayStation Network.

<p align="center">
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square" alt="Styled with Prettier" />
  </a>

  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="Semantic Release" />
  </a>

  <a href="https://codeclimate.com/github/achievements-app/psn-api/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/0722cac09757ab9dc67b/maintainability" />
  </a>

  <a href="https://codeclimate.com/github/achievements-app/psn-api/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/0722cac09757ab9dc67b/test_coverage" />
  </a>
</p>

psn-api is a reference implementation of a [community effort](https://andshrew.github.io/PlayStation-Trophies/#/) to document Sony's APIs for PlayStation authorization and trophy metadata. It saves you the hassle of implementing this community reference yourself by offering a strongly-typed, well-tested, and lightweight package.

<hr />

## Features

✅ &nbsp;Modular by design, and supports tree-shaking.  
✅ &nbsp;Aligns with the [community API documentation](https://andshrew.github.io/PlayStation-Trophies/#/).  
✅ &nbsp;Supports Node environments (14 and above).  
✅ &nbsp;Supports browsers.  
✅ &nbsp;Ships with TypeScript support and types.  
✅ &nbsp;Tiny, <2Kb.

<hr />

## Docs site

The docs site for the library can be found at [https://psn-api.achievements.app](https://psn-api.achievements.app).

## Getting started

### Install

```
npm install --save psn-api
```

OR

```
yarn add psn-api
```

### Usage with Node

Node 14 and above are officially supported. The package can be imported via:

```js
const psn = require("psn-api");
```

### Usage with TypeScript

You can use `import` syntax to utilize the package in your app. This library provides its own type definitions. "It just works", no need to install anything from `@types`.

```ts
import { getUserTrophiesEarnedForTitle } from "psn-api";
```

### Understanding the Promise-based API

All methods in the API are async and return a [native Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

These methods can be used with the native Promise API or the more modern async/await syntax.

```ts
// Native Promise API.
exchangeCodeForAccessToken("myCode").then((accessTokenResponse) => {
  console.log({ accessTokenResponse });
});

// async/await syntax.
const accessTokenResponse = await exchangeCodeForAccessToken("myCode");
console.log({ accessTokenResponse });
```

## How to obtain an authentication token

To use any endpoint function in the API, you must first be authorized by PSN. Fortunately, this is a fairly straightforward process.

1. In your web browser, visit [https://www.playstation.com/](https://www.playstation.com/), click the "Sign In" button, and log in with a PSN account.

2. In the same browser (due to a persisted cookie), visit [https://ca.account.sony.com/api/v1/ssocookie](https://ca.account.sony.com/api/v1/ssocookie). You will see a JSON response that looks something like:

```js
{"npsso":"<64 character token>"}
```

Copy your NPSSO. **Do not expose it anywhere publicly, it is equivalent to your password.**

3. You can now obtain an authentication token using your NPSSO with the following function calls from this package.

```ts
// This is the value you copied from the previous step.
const myNpsso = "<64 character token>";

// We'll exchange your NPSSO for a special access code.
const accessCode = await exchangeNpssoForCode(npsso);

// We can use the access code to get your access token and refresh token.
const authorization = await exchangeCodeForAccessToken(accessCode);
```

4. You should now be all set to use any endpoint provided by this package. Each function requires as its first argument an object containing your access token. ex:

```ts
const authorization = await exchangeCodeForAccessToken(accessCode);

// This returns a list of all the games you've earned trophies for.
const trophyTitlesResponse = await getUserTitles(
  { accessToken: authorization.accessToken },
  "me"
);
```

## API

Click the function names to open their complete docs on the docs site.

### Authentication

- [`exchangeCodeForAccessToken()`](https://psn-api.achievements.app/api-docs/authentication#exchangecodeforaccesstoken) - Exchange your access code for access and refresh tokens.
- [`exchangeNpssoForCode()`](https://psn-api.achievements.app/api-docs/authentication#exchangenpssoforcode) - Exchange your NPSSO for an access code.

### Search

- [`makeUniversalSearch()`](https://psn-api.achievements.app/api-docs/universal-search#makeuniversalsearch) - Search the PSN API. This is a good way to find a user's `accountId` from their username.

### Trophies

- [`getTitleTrophies()`](https://psn-api.achievements.app/api-docs/title-trophies#gettitletrophies) - Retrieve the individual trophy details of a single or all trophy groups for a title.
- [`getTitleTrophyGroups()`](https://psn-api.achievements.app/api-docs/title-trophies#gettitletrophygroups) - Get a list of trophy groups (typically the base set and DLCs) for a title.
- [`getUserSummarizedTrophiesByTrophyGroup()`](https://psn-api.achievements.app/api-docs/user-trophies#getusersummarizedtrophiesbytrophygroup) - Get a summary of trophies earned for a user broken down by trophy group within a title.
- [`getUserTitles()`](https://psn-api.achievements.app/api-docs/user-trophies#getusertitles) - Retrieve a list of the titles associated with an account and a summary of trophies earned from them.
- [`getUserTrophiesEarnedForTitle()`](https://psn-api.achievements.app/api-docs/user-trophies#getusertrophiesearnedfortitle) - Retrieve the earned status of trophies for a user from either a single or all trophy groups in a title.
- [`getUserTrophyProfileSummary()`](https://psn-api.achievements.app/api-docs/user-trophies#getusertrophyprofilesummary) - Retrieve an overall summary of the number of trophies earned for a user broken down by type.

## Examples

- [Build a user's complete trophy list and write it to a JSON file](examples/buildUserTrophyList.ts)

## Prior Art

[Tustin/psn-php](https://github.com/Tustin/psn-php) - A PHP wrapper for the PSN API  
[andshrew/PlayStation-Trophies](https://github.com/andshrew/PlayStation-Trophies/) - an attempt at documenting the PSN API by capturing the requests made by the PlayStation website

## Disclaimer

This project is not intended to be used for spam or abuse. Please use this project to elevate the PlayStation Network experience, not damage it.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/wescopeland"><img src="https://avatars.githubusercontent.com/u/3984985?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wes Copeland</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=wescopeland" title="Code">💻</a> <a href="#example-wescopeland" title="Examples">💡</a> <a href="https://github.com/achievements-app/psn-api/commits?author=wescopeland" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/xelnia"><img src="https://avatars.githubusercontent.com/u/14896738?v=4?s=100" width="100px;" alt=""/><br /><sub><b>xelnia</b></sub></a><br /><a href="#ideas-xelnia" title="Ideas, Planning, & Feedback">🤔</a> <a href="#userTesting-xelnia" title="User Testing">📓</a></td>
    <td align="center"><a href="https://github.com/andshrew"><img src="https://avatars.githubusercontent.com/u/7409326?v=4?s=100" width="100px;" alt=""/><br /><sub><b>andshrew</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=andshrew" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/purplem1lk"><img src="https://avatars.githubusercontent.com/u/49956513?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Susan Ma</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=purplem1lk" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
