# Authenticating Manually

The most common auth flow that users interacting with PSN's APIs use is the manual authentication flow. This flow is also described in the [Quick Start guide](/get-started#quick-start).

The disadvantage to this flow is that after a few months you will need to remember to manually retrieve another NPSSO token to ultimately exchange for access and refresh tokens.

## The authorization flow

From a high-level, to become authorized to use PSN's APIs, you must go through the following flow:

1. Obtain several authentication cookies by signing in with your email/password credentials.

2. Exchange these authentication cookies for an NPSSO token.

3. Exchange your NPSSO token for an access code.

4. Exchange your access code for an access token and a refresh token.

Once you have an access token, you can retrieve data from the PSN API.

Eventually your access token will expire. You can get a new access token by using the refresh token (_TODO: how?_).

## Get started

### Log in

In your web browser, visit [the PlayStation homepage](https://www.playstation.com/), click the "Sign In" button, and log in with a PSN account.

### Retrieve your NPSSO token

In the same browser that you used to log in (due to a persisted cookie), visit [this page](https://ca.account.sony.com/api/v1/ssocookie). You will see a JSON response that looks something like:

```json
{ "npsso": "<64 character token>" }
```

### Exchange your NPSSO token

You can now obtain an authentication token using your NPSSO with the following function calls from this package.

```ts
// This is the value you copied from the previous step.
const myNpsso = "<64 character token>";

// We'll exchange your NPSSO for a special access code.
const accessCode = await exchangeNpssoForCode(npsso);

// 🚀 We can use the access code to get your access token and refresh token.
const authorization = await exchangeCodeForAccessToken(accessCode);
```

## API

- [exchangeNpssoForCode](/api/functions/exchangeNpssoForCode)
- [exchangeCodeForAccessToken](/api/functions/exchangeCodeForAccessToken)
