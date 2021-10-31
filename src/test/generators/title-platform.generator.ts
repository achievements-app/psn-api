import * as faker from "faker";

import type { TitlePlatform } from "../../models";

export const generateTitlePlatform = (givenTitlePlatform?: string) => {
  return (
    givenTitlePlatform ??
    faker.random.arrayElement<TitlePlatform>(["PS3", "PS4", "PS5", "Vita"])
  );
};
