import { faker } from "@faker-js/faker";

import type { TrophyTitle } from "../../models";
import { generateTitlePlatform } from "./title-platform.generator";
import { generateTrophyCounts } from "./trophy-counts.generator";

export const generateTrophyTitle = (
  trophyTitleProps?: Partial<TrophyTitle>
): TrophyTitle => {
  const trophyTitlePlatform =
    trophyTitleProps?.trophyTitlePlatform ?? generateTitlePlatform();

  const npServiceName =
    (trophyTitleProps?.npServiceName ?? trophyTitlePlatform === "PS5")
      ? "trophy2"
      : "trophy";

  return {
    npServiceName,
    trophyTitlePlatform,
    npCommunicationId: faker.string.alphanumeric(10),
    trophySetVersion: "1.00",
    trophyTitleName: faker.lorem.words(3),
    trophyTitleIconUrl: faker.internet.url(),
    hasTrophyGroups: faker.datatype.boolean(),
    definedTrophies: generateTrophyCounts(),
    progress: faker.number.int({ min: 0, max: 100 }),
    earnedTrophies: generateTrophyCounts(),
    hiddenFlag: faker.datatype.boolean(),
    lastUpdatedDateTime: faker.date.recent().toISOString(),
    ...trophyTitleProps
  };
};
