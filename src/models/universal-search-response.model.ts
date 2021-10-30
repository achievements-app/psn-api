import type { UniversalSearchDomainResponse } from "./universal-search-domain-response.model";

export interface UniversalSearchResponse<T> {
  prefix: string;
  suggestions: string[];
  fallbackQueried: boolean;
  domainResponses: UniversalSearchDomainResponse<T>[];
}
