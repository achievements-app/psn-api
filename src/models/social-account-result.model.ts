export interface SocialAccountResult {
  id: string;
  type: string;
  score: number;
  scoreMetadata: {
    accountId: number;
    country: string;
    language: string;
    onlineId: string;
    isPsPlus: boolean;
    isOfficiallyVerified: boolean;
    avatarUrl: string;
    verifiedUserName: string;
    highlights: {
      onlineId: string[];
    };
  };
}
