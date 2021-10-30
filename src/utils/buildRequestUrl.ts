import urlcat from "urlcat";

import type { AllCallOptions } from "@/models";

export const buildRequestUrl = (
  baseUrl: string,
  endpointUrl: string,
  options: Partial<AllCallOptions> = {},
  args: Record<string, string | number> = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is an intentional pick.
  const { headerOverrides, ...pickedOptions } = options;

  return urlcat(baseUrl, endpointUrl, { ...args, ...pickedOptions });
};
