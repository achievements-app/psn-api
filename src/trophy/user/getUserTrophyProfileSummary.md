# getUserTrophyProfileSummary

```ts
/**
 * A call to this function will retrieve an overall summary of the number of
 * trophies earned for a user broken down by type, as well as their current
 * overall trophy level, progress towards the next level and which tier their
 * current level falls in to. The tiers are based on the [level changes introduced in 2020](https://andshrew.github.io/PlayStation-Trophies/images/psn-trophy-tiers.png).
 *
 * The numeric `accountId` can be that of any PSN account for which the
 * authenticating account has permissions to view the trophy list.
 * When querying the titles associated with the authenticating account, the
 * numeric `accountId` can be substituted with `"me"`.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getUserTrophyProfileSummary = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: Partial<GetUserTrophyProfileSummaryOptions>
): Promise<UserTrophyProfileSummaryResponse> => {
```

```ts
interface UserTrophyProfileSummaryResponse {
  /** The ID of the account being accessed. */
  accountId: string;

  /** The account's overall trophy level. */
  trophyLevel: string;

  /** The account's percentage process towards the next trophy level. */
  progress: number;

  /**
   * The tier this trophy level is in.
   *
   * | Tier | Grade    | `trophyLevel` Ranges |
   * | ---  | ---      | ---:                 |
   * | 1    | Bronze   | 1 - 99               |
   * | 2    | Bronze   | 100 - 199            |
   * | 3    | Bronze   | 200 - 299            |
   * | 4    | Silver   | 300 - 399            |
   * | 5    | Silver   | 400 - 499            |
   * | 6    | Silver   | 500 - 599            |
   * | 7    | Gold     | 600 - 699            |
   * | 8    | Gold     | 700 - 799            |
   * | 9    | Gold     | 800 - 998            |
   * | 10   | Platinum | 999                  |
   */
  tier: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  /** The account's number of earned trophies by type. */
  earnedTrophies: TrophyCounts;
}
```

```ts
// Usage example

// Returns a high-level overview of your overall trophy earnings.
const response = await getUserTrophyProfileSummary(authorization, "me");
```
