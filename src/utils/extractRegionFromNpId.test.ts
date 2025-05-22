import { encodeBase64 } from "./encodeBase64";
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
    const mockNpId = encodeBase64("testuser@psn.jp");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("JP");
  });

  it("extracts GB region code from a valid NPID", () => {
    // ARRANGE
    // This base64 string decodes to something like "username@domain.gb"
    const mockNpId = encodeBase64("britishuser@psn.gb");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("GB");
  });

  it("returns region code in uppercase regardless of input case", () => {
    // ARRANGE
    const mockNpId = encodeBase64("lowercaseuser@psn.fr");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("FR"); // Ensure uppercase even though "fr" is lowercase in the input
  });

  it("returns null for npId with invalid format (missing @)", () => {
    // ARRANGE
    const mockNpId = encodeBase64("invalid-format.us");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with invalid format (missing .)", () => {
    // ARRANGE
    const mockNpId = encodeBase64("invalid@formatcom");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with region code longer than 2 characters", () => {
    // ARRANGE
    const mockNpId = encodeBase64("user@domain.usa");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with region code containing non-alphabetic characters", () => {
    // ARRANGE
    const mockNpId = encodeBase64("user@domain.u1");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });
});
