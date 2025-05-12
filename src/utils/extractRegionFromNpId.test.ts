import { extractRegionFromNpId } from "./extractRegionFromNpId";

describe("Function: extractRegionFromNpId", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(extractRegionFromNpId).toBeDefined();
  });

  it("returns null if npId is empty or undefined", () => {
    // ASSERT
    expect(extractRegionFromNpId("")).toBeNull();
    expect(extractRegionFromNpId(undefined as unknown as string)).toBeNull();
  });

  it("extracts US region code from a valid NPID", () => {
    // ARRANGE
    // This base64 string decodes to something like "username@domain.us"
    const mockNpId = "eGVsbmlhQGM2LnVz"; // Decodes to "xelnia@c6.us"

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("US");
  });

  it("extracts JP region code from a valid NPID", () => {
    // ARRANGE
    // This base64 string decodes to something like "username@domain.jp"
    const mockNpId = Buffer.from("testuser@psn.jp").toString("base64");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("JP");
  });

  it("extracts GB region code from a valid NPID", () => {
    // ARRANGE
    // This base64 string decodes to something like "username@domain.gb"
    const mockNpId = Buffer.from("britishuser@psn.gb").toString("base64");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("GB");
  });

  it("returns region code in uppercase regardless of input case", () => {
    // ARRANGE
    const mockNpId = Buffer.from("lowercaseuser@psn.fr").toString("base64");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("FR"); // Ensure uppercase even though "fr" is lowercase in the input
  });

  it("returns null for npId with invalid format (missing @)", () => {
    // ARRANGE
    const mockNpId = Buffer.from("invalid-format.us").toString("base64");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with invalid format (missing .)", () => {
    // ARRANGE
    const mockNpId = Buffer.from("invalid@formatcom").toString("base64");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with region code longer than 2 characters", () => {
    // ARRANGE
    const mockNpId = Buffer.from("user@domain.usa").toString("base64");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with region code containing non-alphabetic characters", () => {
    // ARRANGE
    const mockNpId = Buffer.from("user@domain.u1").toString("base64");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });
  it("returns null for npId that causes a decoding error", () => {
    // ARRANGE
    // Mock Buffer.from to throw an error
    const originalBufferFrom = Buffer.from;
    Buffer.from = jest.fn().mockImplementation(() => {
      throw new Error("Mocked decoding error");
    });

    // Spy on console.error to prevent it from polluting test output
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // ACT
    const result = extractRegionFromNpId("some-npid");

    // ASSERT
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Cleanup
    consoleErrorSpy.mockRestore();
    Buffer.from = originalBufferFrom;
  });
});
