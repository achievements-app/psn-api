import { buildUserTrophyList } from "./buildUserTrophyList";

console.log("👷‍♂️ Started dev playground.");
console.log("Output is being dumped from src/dev.ts.\n");

// https://ca.account.sony.com/api/v1/ssocookie

async function main() {
  // 👉 👉 👉 Start building here.
  // You'll see this code be called when you're running `yarn dev`.
  buildUserTrophyList("aaa");
}

main();
