import { faker } from "@faker-js/faker";

import type { TitlePlatform } from "../../models";

export const generateTitlePlatform = (givenTitlePlatform?: string) => {
  return (
    givenTitlePlatform ??
    faker.helpers.arrayElement<TitlePlatform>(["PS3", "PS4", "PS5", "Vita"])
  );
};
