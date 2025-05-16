import { RegionCode } from "../models";
import { decodeBase64 } from "./decodeBase64";

/**
 * Extracts the region code from a base64-encoded NPID string and returns the region code.
 *
 * @param npId The base64-encoded NPID string, which is decoded to extract the region code.
 * @returns The ISO 3166-1 alpha-2 region code (e.g., "US", "JP", "GB") as a RegionCode,
 * or null if extraction fails or the NPID is invalid.
 *
 * This function assumes a valid NPID format (e.g., "VaultTec-Co@b7.us"). It splits the string to get
 * the region code (e.g., "us"), which is then returned as uppercase.
 */
export const extractRegionFromNpId = (npId: string): RegionCode | null => {
  if (!npId) {
    return null;
  }

  try {
    // Decode the base64-encoded NPID
    // Note: Buffer is Node.js specific. For cross-platform (browser/Node)
    // consider alternatives if needed, though NPID format might be ASCII-safe for atob.
    const decodedNpId = decodeBase64(npId);

    // Assuming a decoded npid format (e.g. VaultTec-Co@b7.us), extract the region part.
    if (decodedNpId.includes("@") && decodedNpId.includes(".")) {
      const parts = decodedNpId.split(".");
      const regionCandidate = parts.pop(); // Get the last part, which should be the region

      // Validate that the candidate is a two-letter alphabetic string
      if (
        regionCandidate &&
        regionCandidate.length === 2 &&
        /^[A-Za-z]+$/.test(regionCandidate)
      ) {
        return regionCandidate.toUpperCase() as RegionCode; // Return as uppercase RegionCode
      }
    }

    return null; // Return null if format is not as expected or validation fails
  } catch (error) {
    // Catch errors from base64 decoding or other unexpected issues
    console.error("Failed to extract region from NPID:", error);
    return null;
  }
};
