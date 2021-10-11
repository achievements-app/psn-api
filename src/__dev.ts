import { buildUserTrophyList } from "./buildUserTrophyList";

console.log("👷‍♂️ Started dev playground.");
console.log("Output is being dumped from src/dev.ts.\n");

// Start editing below this line.

// // https://ca.account.sony.com/api/v1/ssocookie

async function main() {
  await buildUserTrophyList("962157895908076652");
}

main();
