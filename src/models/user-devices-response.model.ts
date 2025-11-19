export interface AccountDevicesResponse {
  /** The user's account ID. */
  accountId: string;

  /** List of devices the account is logged into. */
  accountDevices: Array<{
    /** The device ID */
    deviceId: string;

    /**
     * The device type/platform.
     * @example "PS5" | "PS4" | "PS3" | "PSVita"
     */
    deviceType: string;

    /**
     * The activation type.
     * @example "PRIMARY" | "PSN_GAME_V3"
     */
    activationType: string;

    /** The device activation date in ISO format. */
    activationDate: string;

    /** The account device vector. */
    accountDeviceVector: string;
  }>;
}
