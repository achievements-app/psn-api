export interface ShareableProfileLinkResponse {
  /**
   * The shareable URL for the user's PlayStation profile.
   * This link can be shared with others to view the user's public profile.
   */
  shareUrl: string;

  /**
   * The URL to a shareable image representing the user's profile.
   * This image can be shared on social media or other platforms.
   */
  shareImageUrl: string;

  /**
   * The destination URL that the shareable image links to.
   * This is typically the user's profile page when accessed via the shared image.
   */
  shareImageUrlDestination: string;
}
