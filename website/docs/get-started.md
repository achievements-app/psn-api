---
sidebar_position: 1
---

# Get Started

First, we'll install the package. Then, we'll make our first authentication to the PlayStation Network. After these steps are completed, you are able to use any function provided by the library.

## Quick Start

Install the package:

```bash npm2yarn
npm install psn-api
```

You will need to be authorized to use the PSN API. To authenticate manually, follow these steps:

1. In your web browser, visit [the PlayStation homepage](https://www.playstation.com/), click the "Sign In" button, and log in with a PSN account.

2. In the same browser (due to a persisted cookie), visit [this page](https://ca.account.sony.com/api/v1/ssocookie). You will see a JSON response that looks something like:

```json
{ "npsso": "<64 character token>" }
```

If you see an error response, try using a different browser.

3. You can now obtain an authentication token using your NPSSO with the following function calls from this package.

```ts
// This is the value you copied from the previous step.
const myNpsso = "<64 character token>";

// We'll exchange your NPSSO for a special access code.
const accessCode = await exchangeNpssoForCode(npsso);

// 🚀 We can use the access code to get your access token and refresh token.
const authorization = await exchangeCodeForAccessToken(accessCode);
```

4. You now have all you need to use any function in the API. Each function takes this authorization object as its first argument. **To be more precise, the functions are looking for your `accessToken` value.** Here's an example:

```ts
// This returns a list of all the games you've earned trophies for.
const trophyTitlesResponse = await getUserTitles(
  { accessToken: authorization.accessToken },
  "me"
);
```
