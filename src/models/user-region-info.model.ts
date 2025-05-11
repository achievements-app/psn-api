/**
 * Represents region information for a PlayStation Network user.
 */
export interface UserRegionInfo {
  /**
   * The two-letter country code (ISO 3166-1 alpha-2)
   */
  code: RegionCode;

  /**
   * The full name of the country in English
   */
  name?: string;
}

/**
 * Represents a two-letter uppercase ISO 3166-1 alpha-2 region code.
 * For example: "US", "JP", "GB".
 */
export type RegionCode = string;
