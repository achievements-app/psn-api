export interface UniversalSearchDomainResponse<T> {
  domain: string;
  domainTitle: string;
  domainTitleMessageId: string;
  zeroState: boolean;
  univexId: string;
  facetOptions: unknown[];
  next: string;
  totalResultCount: number;
  results: T[];
}
