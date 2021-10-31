export interface AuthTokensResponse {
  /** Used to retrieve data from the PSN API. */
  accessToken: string;

  /** When the access token will expire. */
  expiresIn: number;

  idToken: string;

  /** Used to retrieve a new access token when it expires. */
  refreshToken: string;

  /** When the refresh token will expire. */
  refreshTokenExpiresIn: number;

  scope: string;
  tokenType: string;
}
