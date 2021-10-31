import type { AllCallOptions } from "../models";

export const buildRequestUrl = (
  baseUrl: string,
  endpointUrl: string,
  options: Partial<AllCallOptions> = {},
  args: Record<string, string | number> = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is an intentional pick.
  const { headerOverrides, ...pickedOptions } = options;

  const concatenated = `${baseUrl}/${endpointUrl}`;
  const withoutDoubleSlashes = concatenated.replace(/([^:]\/)\/+/g, "$1");

  let withArgs = withoutDoubleSlashes;
  const queryParamValues: Record<string, string> = {};

  for (const [argKey, argValue] of Object.entries({
    ...args,
    ...pickedOptions
  })) {
    if (withArgs.includes(`:${argKey}`)) {
      withArgs = withArgs.replace(`:${argKey}`, String(argValue));
    } else if (argValue !== undefined) {
      queryParamValues[argKey] = String(argValue);
    }
  }

  const queryString = new URLSearchParams(queryParamValues).toString();
  return queryString.length > 0 ? `${withArgs}?${queryString}` : withArgs;
};
