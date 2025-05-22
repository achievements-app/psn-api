/**
 * Cross-platform base64 encoding function
 */
export function encodeBase64(str: string): string {
  try {
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      return window.btoa(str); // Browser encoding
    } else if (typeof Buffer !== "undefined") {
      return Buffer.from(str, "utf8").toString("base64"); // Node.js encoding
    } else {
      throw new TypeError("Base64 encoding unsupported in this environment");
    }
  } catch (error) {
    throw new Error(`Base64 encoding error: ${error}`);
  }
}
