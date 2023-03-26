<h1 align="center">psn-api</h1>

<p align="center">
  <img width="40%" height="40%" src="psx.png" />
  <br /><br />
  <i>A JavaScript library that lets you get trophy, user, and game data from the PlayStation Network.</i>
  <br /><br />
</p>

<p align="center">
  <a href="https://psn-api.achievements.app"><strong>Documentation: Get Started</strong></a>
  <br />
</p>

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

<hr />

## Features

✅ &nbsp;Modular by design, and supports tree-shaking.  
✅ &nbsp;Aligns with the [community API documentation](https://andshrew.github.io/PlayStation-Trophies/#/).  
✅ &nbsp;Supports Node environments (14 and above).  
✅ &nbsp;Supports browsers.  
✅ &nbsp;Ships with TypeScript support and types.  
✅ &nbsp;Small, <5Kb.

<hr />

## Documentation

Learn how to authenticate and start pulling data from the PlayStation Network on our documentation website.

- [Get started](https://psn-api.achievements.app/get-started)
- [How to authenticate](https://psn-api.achievements.app/authentication/authenticating-manually)
- [Get all trophies for a game](https://psn-api.achievements.app/api-docs/title-trophies#gettitletrophies)
- [Search for a user](https://psn-api.achievements.app/api-docs/universal-search#makeuniversalsearch)

## Installation

Run the following command:

```bash
npm install psn-api
```

## How to obtain an authentication token

To use any endpoint function in the API, you must first be authorized by PSN. Fortunately, this is a fairly straightforward process.

1. In your web browser, visit [https://www.playstation.com/](https://www.playstation.com/), click the "Sign In" button, and log in with a PSN account.

2. In the same browser (due to a persisted cookie), visit [https://ca.account.sony.com/api/v1/ssocookie](https://ca.account.sony.com/api/v1/ssocookie). You will see a JSON response that looks something like:

```js
{ "npsso": "<64 character token>" }
```

Copy your NPSSO. **Do not expose it anywhere publicly, it is equivalent to your password.**

If you see an error response, try using different browser.

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
- [`exchangeRefreshTokenForAuthTokens()`](https://psn-api.achievements.app/api-docs/authentication#exchangerefreshtokenforauthtokens) - Get a new access token using your refresh token (bypassing the need to constantly auth with your NPSSO).

### Search

- [`makeUniversalSearch()`](https://psn-api.achievements.app/api-docs/universal-search#makeuniversalsearch) - Search the PSN API. This is a good way to find a user's `accountId` from their username.

### Users

- [`getProfileFromUserName()`](https://psn-api.achievements.app/api-docs/users#getprofilefromusername) - Get a user's legacy profile from the username. Often used to check for legacy presence.
- [`getProfileFromAccountId()`](https://psn-api.achievements.app/api-docs/users#getprofilefromaccountid) - Get a user's profile from the `accountId`.
- [`getUserFriendsAccountIds()`](https://psn-api.achievements.app/api-docs/users#getuserfriendsaccountids) - Get a list of `accountId` values present on a target account's friends list.

### Trophies

- [`getTitleTrophies()`](https://psn-api.achievements.app/api-docs/title-trophies#gettitletrophies) - Retrieve the individual trophy details of a single or all trophy groups for a title.
- [`getTitleTrophyGroups()`](https://psn-api.achievements.app/api-docs/title-trophies#gettitletrophygroups) - Get a list of trophy groups (typically the base set and DLCs) for a title.
- [`getUserTitles()`](https://psn-api.achievements.app/api-docs/user-trophies#getusertitles) - Retrieve a list of the titles associated with an account and a summary of trophies earned from them.
- [`getUserTrophiesEarnedForTitle()`](https://psn-api.achievements.app/api-docs/user-trophies#getusertrophiesearnedfortitle) - Retrieve the earned status of trophies for a user from either a single or all trophy groups in a title.
- [`getUserTrophyGroupEarningsForTitle()`](https://psn-api.achievements.app/api-docs/user-trophies#getusertrophygroupearningsfortitle) - Get a summary of trophies earned for a user broken down by trophy group within a title.
- [`getUserTrophyProfileSummary()`](https://psn-api.achievements.app/api-docs/user-trophies#getusertrophyprofilesummary) - Retrieve an overall summary of the number of trophies earned for a user broken down by type.
- [`getRecentlyPlayedGames()`](https://psn-api.achievements.app/api-docs/users#getrecentlyplayedgames) - Retrieve a list of recently played games for the user associated with the access token provided to this function.

## Examples

- [Build a user's complete trophy list and write it to a JSON file](https://psn-api.achievements.app/examples/user-trophy-list)

## Projects Using psn-api

- [PS5 MQTT](https://github.com/FunkeyFlo/ps5-mqtt) - Integrate your PlayStation 5 with Home Assistant.
- [evanshortiss/README.md](https://github.com/evanshortiss/evanshortiss) - Auto-updating GitHub bio with recently played games list.

## Prior Art

- [Tustin/psn-php](https://github.com/Tustin/psn-php) - A high-level PHP wrapper for the PSN API.
- [isFakeAccount/psnawp](https://github.com/isFakeAccount/psnawp) - A high-level Python wrapper for the PSN API.
- [andshrew/PlayStation-Trophies](https://github.com/andshrew/PlayStation-Trophies/) - an attempt at documenting the PSN API by capturing the requests made by the PlayStation website.

## Disclaimer

This project is not intended to be used for spam or abuse. Please use this project to elevate the PlayStation Network experience, not damage it.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wescopeland"><img src="https://avatars.githubusercontent.com/u/3984985?v=4?s=100" width="100px;" alt="Wes Copeland"/><br /><sub><b>Wes Copeland</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=wescopeland" title="Code">💻</a> <a href="#example-wescopeland" title="Examples">💡</a> <a href="https://github.com/achievements-app/psn-api/commits?author=wescopeland" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xelnia"><img src="https://avatars.githubusercontent.com/u/14896738?v=4?s=100" width="100px;" alt="xelnia"/><br /><sub><b>xelnia</b></sub></a><br /><a href="#ideas-xelnia" title="Ideas, Planning, & Feedback">🤔</a> <a href="#userTesting-xelnia" title="User Testing">📓</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/andshrew"><img src="https://avatars.githubusercontent.com/u/7409326?v=4?s=100" width="100px;" alt="andshrew"/><br /><sub><b>andshrew</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=andshrew" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/purplem1lk"><img src="https://avatars.githubusercontent.com/u/49956513?v=4?s=100" width="100px;" alt="Susan Ma"/><br /><sub><b>Susan Ma</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=purplem1lk" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/travisrroy"><img src="https://avatars.githubusercontent.com/u/24424190?v=4?s=100" width="100px;" alt="Travis Roy"/><br /><sub><b>Travis Roy</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=travisrroy" title="Code">💻</a> <a href="#example-travisrroy" title="Examples">💡</a> <a href="https://github.com/achievements-app/psn-api/commits?author=travisrroy" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Azimiao"><img src="https://avatars.githubusercontent.com/u/11534726?v=4?s=100" width="100px;" alt="Yetu"/><br /><sub><b>Yetu</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=Azimiao" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jojo.fandom.com/wiki/Yoshikage_Kira"><img src="https://avatars.githubusercontent.com/u/65515165?v=4?s=100" width="100px;" alt="Yoshikage Kira"/><br /><sub><b>Yoshikage Kira</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=isFakeAccount" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://evanshortiss.com"><img src="https://avatars.githubusercontent.com/u/1303687?v=4?s=100" width="100px;" alt="Evan Shortiss"/><br /><sub><b>Evan Shortiss</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=evanshortiss" title="Code">💻</a> <a href="https://github.com/achievements-app/psn-api/commits?author=evanshortiss" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
