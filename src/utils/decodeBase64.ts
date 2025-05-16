/**
 * Cross-platform base64 decoding function
 */
export function decodeBase64(base64String: string): string {
  try {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      return window.atob(base64String); // Browser decoding
    } else if (typeof Buffer !== "undefined") {
      return Buffer.from(base64String, "base64").toString("utf8"); // Node.js decoding
    } else {
      throw new Error("Base64 decoding unsupported in this environment");
    }
  } catch (error) {
    throw new Error(`Base64 decoding error: ${error}`);
  }
}
