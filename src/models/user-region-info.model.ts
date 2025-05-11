/**
 * Represents region information for a PlayStation Network user.
 */
export interface UserRegionInfo {
  /**
   * The two-letter country code (ISO 3166-1 alpha-2)
   *
   * @example "US"
   */
  code: RegionCode;

  /**
   * The full name of the country in English
   *
   * @example "United States"
   */
  name?: string;
}

/**
 * Represents a two-letter uppercase ISO 3166-1 alpha-2 region code.
 *
 * @example "US"
 */
export type RegionCode = `${Uppercase<string>}${Uppercase<string>}`;
