export interface ProfileFromAccountIdResponse {
  /**
   * The account's online username.
   *
   * @example
   * ```json
   * "onlineId": "Hakoom"
   * ```
   */
  onlineId: string;
  aboutMe: string;
  avatars: Array<{ size: string; url: string }>;

  languages: string[];
  /** Whether or not the account is a PlayStation Plus subscriber. */
  isPlus: boolean;

  isOfficiallyVerified: boolean;
  isMe: boolean;
}
