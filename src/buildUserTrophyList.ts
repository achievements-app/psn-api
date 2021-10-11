import fs from "fs";

import {
  call as psnCall,
  getAuthenticationToken,
  getTitleTrophies,
  getUserEarnedTrophiesForTitle,
  getUserTitles
} from ".";
import { Trophy } from "./models/trophy.model";
import { TrophyRarity } from "./models/trophy-rarity.model";

const npsso =
  "1ZJugQkLgxvWHAyJL48azw6rYkH28qul5zvP7et8khlElTqamBVsDcRntHRBfO0w";

export const buildUserTrophyList = async (userId: string) => {
  const { accessToken } = await getAuthenticationToken(npsso);

  const { trophyTitles } = await getUserTitles(userId, {
    accessToken
  });

  const games: any[] = [];

  let count = 1;
  for (const title of trophyTitles) {
    const { trophies: titleTrophies } = await getTitleTrophies(
      title.npCommunicationId,
      "all",
      {
        accessToken
      },
      { platform: title.trophyTitlePlatform }
    );

    const { trophies: earnedTrophies } = await getUserEarnedTrophiesForTitle(
      userId,
      title.npCommunicationId,
      "all",
      { accessToken },
      { platform: title.trophyTitlePlatform }
    );

    const mergedTrophies = mergeTrophyLists(titleTrophies, earnedTrophies);

    const game = {
      gameName: title.trophyTitleName,
      platform: title.trophyTitlePlatform,
      trophyTypeCounts: title.definedTrophies,
      earnedCounts: title.earnedTrophies,
      trophyList: mergedTrophies
    };

    games.push(game);
    console.log("writing game", count);

    count += 1;
  }

  fs.writeFileSync("./games.json", JSON.stringify(games));
};

const mergeTrophyLists = (
  titleTrophies: Trophy[],
  earnedTrophies: Trophy[]
) => {
  const mergedTrophies: any[] = [];

  for (const earnedTrophy of earnedTrophies) {
    const foundTitleTrophy = titleTrophies.find(
      (t) => t.trophyId === earnedTrophy.trophyId
    );

    mergedTrophies.push(
      normalizeTrophy({ ...earnedTrophy, ...foundTitleTrophy })
    );
  }

  return mergedTrophies;
};

const normalizeTrophy = (trophy: Trophy) => {
  return {
    isEarned: trophy.earned ?? false,
    earnedOn: trophy.earned ? trophy.earnedDateTime : "unearned",
    type: trophy.trophyType,
    rarity: rarityMap[trophy.trophyRare ?? 0],
    earnedRate: Number(trophy.trophyEarnedRate),
    trophyName: trophy.trophyName,
    groupId: trophy.trophyGroupId
  };
};

const rarityMap: Record<TrophyRarity, string> = {
  [TrophyRarity.VeryRare]: "Very Rare",
  [TrophyRarity.UltraRare]: "Ultra Rare",
  [TrophyRarity.Rare]: "Rare",
  [TrophyRarity.Common]: "Common"
};
