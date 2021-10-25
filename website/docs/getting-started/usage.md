# Usage

psn-api functions work in isolation. **They are tree-shakeable**, and will only pull in the code they need to execute.

You can use any of the functions as demonstrated in the documentation. Please refer to each component's docs page to see how they should be used.

## Quick start

Be sure you have installed the package by running:

```bash
# with npm
npm install --save psn-api

# with yarn
yarn add psn-api
```

First, you will need to be authorized to use the PSN API. To authenticate manually, follow these steps:

1. In your web browser, visit [https://www.playstation.com/](https://www.playstation.com/), click the "Sign In" button, and log in with a PSN account.

2. In the same browser (due to a persisted cookie), visit [https://ca.account.sony.com/api/v1/ssocookie](https://ca.account.sony.com/api/v1/ssocookie). You will see a JSON response that looks something like:

```json
{ "npsso": "<64 character token>" }
```

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
