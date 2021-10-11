<p align="center">
  <img width="40%" height="40%" src="psx.png">
</p>

# PSN API

> A low-level API for getting data from the PlayStation Network.

<p align="center">
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square" alt="Styled with Prettier">
  </a>

  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="Semantic Release">
  </a>
</p>

PSN API is a reference implementation of a [community effort](https://andshrew.github.io/PlayStation-Trophies/#/) to document Sony's APIs for PlayStation authorization and trophy metadata. It saves you the hassle of implementing this community reference yourself by offering a strongly-typed, well-tested, and lightweight package.

<hr />

## Features

✅ &nbsp;Modular by design, supports tree-shaking.  
✅ &nbsp;Aligns with the [community PSN API documentation](https://andshrew.github.io/PlayStation-Trophies/#/).  
✅ &nbsp;Supports Node environments (14 and above).  
✅ &nbsp;Supports browsers.  
✅ &nbsp;Ships with TypeScript support and types.  
✅ &nbsp;Tiny, <2Kb.

<hr />

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
import { getTrophiesEarnedForTitle } from "psn-api";
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

1. In your web browser, visit [https://my.playstation.com/](https://my.playstation.com/) and log in with a PSN account.

2. In the same browser (due to a persisted cookie), visit [https://ca.account.sony.com/api/v1/ssocookie](https://ca.account.sony.com/api/v1/ssocookie). You will see a JSON response that looks something like:

```js
{"npsso":"Hwl9Vq..."}
```

Copy your NPSSO. **Do not expose it anywhere publicly, it is equivalent to your password.**

3. You can now obtain an authentication token using your NPSSO with the following function calls from this package.

```ts
// This is the value you copied from the previous step.
const myNpsso = "Hwl9Vq...";

// We'll exchange your NPSSO for a special access code.
const accessCode = await exchangeNpssoForCode(npsso);

// We can use the access code to get your access token and refresh token.
const authorization = await exchangeCodeForAccessToken(accessCode);
```

4. You should now be all set to use any endpoint provided by this package. Each function requires as its first argument an object containing your access token. ex:

```ts
const authorization = await exchangeCodeForAccessToken(accessCode);

// This returns a list of all the games you've earned trophies for.
const trophyTitlesResponse = await getTrophyTitlesForUser(
  { accessToken: authorization.accessToken },
  "me"
);
```

## API

Click the function names for complete docs.

### Authentication

- [`exchangeCodeForAccessToken()`](src/authenticate/exchangeCodeForAccessToken.md) - Exchange your access code for access and refresh tokens.
- [`exchangeNpssoForCode()`](src/authenticate/exchangeNpssoForCode.md) - Exchange your NPSSO for an access code.

### Trophies

- [`getSummarizedTrophiesByTrophyGroup()`](src/trophy/getSummarizedTrophiesByTrophyGroup.md) - Get a summary of trophies earned for a user broken down by trophy group within a title.
- [`getTitleTrophyGroups()`](src/trophy/getTitleTrophyGroups.md) - Get a list of trophy groups (typically the base set and DLCs) for a title.
- [`getTrophiesEarnedForTitle()`](src/trophy/getTrophiesEarnedForTitle.md) - Retrieve the earned status of trophies for a user from either a single or all trophy groups in a title.
- [`getTrophiesForTitle()`](src/trophy/getTrophiesForTitle.md) - Retrieve the individual trophy details of a single or all trophy groups for a title.
- [`getTrophyProfileSummary()`](src/trophy/getTrophyProfileSummary.md) - Retrieve an overall summary of the number of trophies earned for a user broken down by type.
- [`getTrophyTitlesForUser()`](src/trophy/getTrophyTitlesForUser.md) - Retrieve a list of the titles associated with an account and a summary of trophies earned from them.

## Examples

- [Build a user's complete trophy list and write it to a JSON file](examples/buildUserTrophyList.ts)

## How to contribute

## Contributors
