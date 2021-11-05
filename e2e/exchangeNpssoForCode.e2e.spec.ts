import { exchangeNpssoForCode } from "../src";

describe("E2E Health Check: exchangeNpssoForCode", () => {
  it("can exchange an NPSSO for an access code", async () => {
    // ACT
    const response = await exchangeNpssoForCode(process.env.NPSSO ?? "");

    // ASSERT
    expect(response).toBeDefined();

    const split = response.split(".");
    expect(split[0]).toEqual("v3");
    expect(split[1].length).toBeGreaterThanOrEqual(6);
  });
});
