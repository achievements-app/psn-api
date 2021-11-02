import type {
  AuthorizationPayload,
  SocialAccountResult,
  UniversalSearchDomains,
  UniversalSearchResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { SEARCH_BASE_URL } from "./SEARCH_BASE_URL";

export const makeUniversalSearch = async <R extends UniversalSearchDomains>(
  authorization: AuthorizationPayload,
  searchTerm: string,
  domain: R
) => {
  const url = buildRequestUrl(SEARCH_BASE_URL, "/v1/universalSearch");

  type AssertType<R> = R extends "SocialAllAccounts"
    ? SocialAccountResult
    : unknown;

  return await call<UniversalSearchResponse<AssertType<typeof domain>>>(
    { url, method: "POST" },
    authorization,
    {
      searchTerm,
      domainRequests: [
        {
          domain
        }
      ]
    }
  );
};
