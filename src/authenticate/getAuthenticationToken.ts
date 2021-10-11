import type { AccessTokenResponse } from "@/models";

import { exchangeCodeForAccessToken } from "./exchangeCodeForAccessToken";
import { exchangeNpssoForCode } from "./exchangeNpssoForCode";

export const getAuthenticationToken = async (
  npssoToken: string
): Promise<AccessTokenResponse> => {
  const code = await exchangeNpssoForCode(npssoToken);
  return await exchangeCodeForAccessToken(code);
};
