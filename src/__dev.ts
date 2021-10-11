import {
  call as psnCall,
  getAuthenticationToken,
  getTitleTrophies,
  getUserEarnedTrophiesForTitle,
  getUserTitles
} from ".";
import { buildUserTrophyList } from "./buildUserTrophyList";

console.log("👷‍♂️ Started dev playground.");
console.log("Output is being dumped from src/dev.ts.\n");

// Start editing below this line.

// // https://ca.account.sony.com/api/v1/ssocookie
const npsso =
  "1ZJugQkLgxvWHAyJL48azw6rYkH28qul5zvP7et8khlElTqamBVsDcRntHRBfO0w";

async function main() {
  // const { accessToken } = await getAuthenticationToken(npsso);
  // const userTitles = await getUserTitles("962157895908076652", {
  //   accessToken
  // });

  // console.log(userTitles);

  await buildUserTrophyList("962157895908076652");

  // const trophies = await getTitleTrophies(
  //   "NPWR20188_00",
  //   "all",
  //   { accessToken },
  //   { platform: "PS5" }
  // );

  // console.log(trophies);

  // const earned = await getUserEarnedTrophiesForTitle(
  //   "962157895908076652",
  //   "NPWR20188_00",
  //   "all",
  //   { accessToken },
  //   { platform: "PS5" }
  // );

  // console.log(earned);

  // const friends = await psnCall(
  //   {
  //     url: "https://m.np.playstation.net/api/userProfile/v1/internal/users/me/friends"
  //   },
  //   { accessToken }
  // );

  // console.log(friends);
}

main();
