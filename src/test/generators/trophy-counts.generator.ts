import { faker } from "@faker-js/faker";

import type { TrophyCounts } from "../../models";

export const generateTrophyCounts = (
  trophyCountsProps?: Partial<TrophyCounts>
): TrophyCounts => {
  return {
    bronze: faker.number.int({ min: 0, max: 1000 }),
    silver: faker.number.int({ min: 0, max: 1000 }),
    gold: faker.number.int({ min: 0, max: 1000 }),
    platinum: faker.number.int({ min: 0, max: 1 }) as 0 | 1,
    ...trophyCountsProps
  };
};
