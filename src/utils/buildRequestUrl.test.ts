import { buildRequestUrl } from "./buildRequestUrl";

describe("Util: buildRequestUrl", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(buildRequestUrl).toBeDefined();
  });

  it("returns a URL correctly", () => {
    // ARRANGE
    const baseUrl = "https://x.y.achievements.app/api/v1/";
    const endpointUrl = "/foo/bar/:baz";

    const options = {
      headerOverrides: {
        "Accept-Language": "en-us"
      },
      mockOption: "mockValue"
    };

    const args = {
      baz: "myBazValue",
      limit: 10,
      offset: 2,
      notDefined: undefined
    };

    // ACT
    const requestUrl = buildRequestUrl(
      baseUrl,
      endpointUrl,
      options,
      args as any
    );

    // ASSERT
    expect(requestUrl).toEqual(
      "https://x.y.achievements.app/api/v1/foo/bar/myBazValue?limit=10&offset=2&mockOption=mockValue"
    );
  });
});
