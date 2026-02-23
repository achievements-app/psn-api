import type { SearchResultsResponse } from "../models";
import { call } from "../utils/call";
import { GRAPHQL_BASE_URL } from "./GRAPHQL_BASE_URL";
import { getSearchResultsHash } from "./operationHashes";

type GetSearchResultsOptions = {
  countryCode: string;
  languageCode: string;
  pageSize?: number;
  pageOffset?: number;
  nextCursor?: string;
};

/**
 * A call to this function will retrieve search results from the PlayStation Store
 * based on the provided search term and pagination.
 *
 * NOTE: This endpoint should be called WITHOUT authorization to receive price information.
 * When called with authorization, price data may be filtered or unavailable.
 *
 * @param searchTerm The search term to query for.
 * @param options An object containing search options including countryCode and languageCode.
 */
export const getSearchResults = async (
  searchTerm: string,
  options: GetSearchResultsOptions
): Promise<SearchResultsResponse> => {
  const { countryCode, languageCode, pageSize, pageOffset, nextCursor } = options;

  const url = new URL(GRAPHQL_BASE_URL);

  url.searchParams.set("operationName", "getSearchResults");

  const variables: Record<string, unknown> = {
    countryCode,
    languageCode,
    pageSize,
    pageOffset,
    searchTerm,
    nextCursor
  };

  url.searchParams.set("variables", JSON.stringify(variables));
  url.searchParams.set(
    "extensions",
    JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash: getSearchResultsHash
      }
    })
  );

  const response = await call<SearchResultsResponse>({
    url: url.toString(),
    headers: {
      "Accept-Language": `${languageCode}-${countryCode}`
    }
  });

  // The GraphQL queries can return non-truthy values.
  if (!response.data || !response.data.universalSearch) {
    throw new Error(JSON.stringify(response));
  }

  return response;
};
