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
    const mockNpId = "eGVsbmlhQGM2LnVz"; // Decodes to "xelnia@c6.us"

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("US");
  });

  it("extracts JP region code from a valid NPID", () => {
    // ARRANGE
    const mockNpId = btoa("testuser@psn.jp");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("JP");
  });

  it("extracts GB region code from a valid NPID", () => {
    // ARRANGE
    const mockNpId = btoa("britishuser@psn.gb");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("GB");
  });

  it("returns region code in uppercase regardless of input case", () => {
    // ARRANGE
    const mockNpId = btoa("lowercaseuser@psn.fr");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toEqual("FR");
  });

  it("returns null for npId with invalid format (missing @)", () => {
    // ARRANGE
    const mockNpId = btoa("invalid-format.us");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with invalid format (missing .)", () => {
    // ARRANGE
    const mockNpId = btoa("invalid@formatcom");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with region code longer than 2 characters", () => {
    // ARRANGE
    const mockNpId = btoa("user@domain.usa");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null for npId with region code containing non-alphabetic characters", () => {
    // ARRANGE
    const mockNpId = btoa("user@domain.u1");

    // ACT
    const result = extractRegionFromNpId(mockNpId);

    // ASSERT
    expect(result).toBeNull();
  });

  it("returns null and logs an error when base64 decoding fails", () => {
    // ARRANGE
    // atob throws on strings with characters outside the base64 alphabet.
    const consoleSpy = vi.spyOn(console, "error").mockImplementation((() => {
      //
    }) as () => void);

    try {
      // ACT
      const result = extractRegionFromNpId("!!!invalid-base64!!!");

      // ASSERT
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to extract region from NPID:",
        expect.any(Error)
      );
    } finally {
      consoleSpy.mockRestore();
    }
  });
});
