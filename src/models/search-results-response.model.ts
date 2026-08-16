export interface SearchResultMedia {
  __typename: "Media";
  role: string;
  type: "IMAGE" | "VIDEO";
  url: string;
}

export interface SearchResultPersonalizedMeta {
  __typename: "PersonalizedMeta";
  hasMediaOverrides: boolean;
  media: SearchResultMedia[];
}

export interface SearchResultSkuPrice {
  __typename: "SkuPrice";
  skuId: string;
  basePrice: string | null;
  discountText: string | null;
  discountedPrice: string | null;
  includesBundleOffer: boolean | null;
  isExclusive: boolean;
  isFree: boolean;
  isTiedToSubscription: boolean | null;
  serviceBranding: string[];
  upsellServiceBranding: string[];
  upsellText: string | null;
}

export interface SearchResultSku {
  __typename: "Sku";
  type: string;
}

export interface SearchResultProduct {
  __typename: "Product";
  id: string;
  name: string;
  npTitleId: string;
  platforms: string[];
  localizedStoreDisplayClassification: string;
  storeDisplayClassification: string;
  media: SearchResultMedia[];
  personalizedMeta: SearchResultPersonalizedMeta;
  price: SearchResultSkuPrice;
  skus: SearchResultSku[];
}

export interface SearchResultPageInfo {
  __typename: "PageInfo";
  isLast: boolean;
  offset: number;
  size: number;
  totalCount: number;
}

export interface SearchResultsResponse {
  data: {
    universalSearch: {
      __typename: "UniversalSearchResponse";
      next: string | null;
      pageInfo: SearchResultPageInfo;
      results: SearchResultProduct[];
    };
  };
}
