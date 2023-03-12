// Hash is computed from the following query (without surrounding quotes):
// "query getUserGameList($categories: String, $limit: Int, $orderBy: String, $subscriptionService: SubscriptionService) {\n  gameLibraryTitlesRetrieve(categories: $categories, limit: $limit, orderBy: $orderBy, subscriptionService: $subscriptionService) {\n    __typename\n    games {\n      __typename\n      conceptId\n      entitlementId\n      image {\n        __typename\n        url\n      }\n      isActive\n      lastPlayedDateTime\n      name\n      platform\n      productId\n      subscriptionService\n      titleId\n    }\n  }\n}\n"
export const getUserGameListHash =
  "e780a6d8b921ef0c59ec01ea5c5255671272ca0d819edb61320914cf7a78b3ae";
