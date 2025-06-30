export interface AccountDevicesResponse {
  /** The User's account ID */
  accountId: string;

  /** List of devices the account is logged into */
  accountDevices: Array<{
    /** The device ID */
    deviceId: string;

    /** The device type/platform (e.g., PS5, PS4, PS3, PSVita) */
    deviceType: string;

    /** The activation type (e.g., PRIMARY, PSN_GAME_V3) */
    activationType: string;

    /** The device activation date in ISO format */
    activationDate: string;

    /** The account device vector */
    accountDeviceVector: string;
  }>;
}
