/**
 * GraphQL endpoints work differently to others in the codebase.
 *
 * The hashes in this file are reverse engineered from app-<hash>.js file loaded by the page
 * at https://library.playstation.com/recently-played. Following the code in that file leads
 * to some Apollo GraphQL code related to persisted queries. This means the request needs to
 * contain a SHA256 hash of the GraphQL query being executed. Searching for PersistedQueryLink
 * and createPersistedQueryLink_hashes, and an AST function in Sony's JS source and debugging
 * will surface the exact GraphQL query that's passed to the hash function on the page.
 *
 * Thankfully it's easier to figure out future endpoints and hashes by:
 *
 * 1. Visiting a page, e.g https://library.playstation.com/recently-played
 * 2. Using DevTools to find requests to https://web.np.playstation.com/api/graphql/v1/op
 * 3. Decoding the URL parameters to find the correct SHA256 hash and some of the supported parameters
 */

// Hash is computed from the following query (without surrounding quotes):
// "query getUserGameList($categories: String, $limit: Int, $orderBy: String, $subscriptionService: SubscriptionService) {\n  gameLibraryTitlesRetrieve(categories: $categories, limit: $limit, orderBy: $orderBy, subscriptionService: $subscriptionService) {\n    __typename\n    games {\n      __typename\n      conceptId\n      entitlementId\n      image {\n        __typename\n        url\n      }\n      isActive\n      lastPlayedDateTime\n      name\n      platform\n      productId\n      subscriptionService\n      titleId\n    }\n  }\n}\n"
export const getUserGameListHash =
  "e780a6d8b921ef0c59ec01ea5c5255671272ca0d819edb61320914cf7a78b3ae";
