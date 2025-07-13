# AccountDevices

| Name             | Type                   | Description                                |
| :--------------- | :--------------------- | :----------------------------------------- |
| `accountId`      | `string`               | The User's account ID                      |
| `accountDevices` | `Array<AccountDevice>` | List of devices the account is logged into |

## AccountDevice

| Name                  | Type     | Description                                                                      |
| :-------------------- | :------- | :------------------------------------------------------------------------------- |
| `deviceId`            | `string` | The unique device identifier                                                     |
| `deviceType`          | `string` | The device type/platform (e.g., PS5, PS4, PS3, PSVita)                           |
| `activationType`      | `string` | The activation type for the device (e.g., PRIMARY, PSN_GAME_V3)                  |
| `activationDate`      | `string` | The device activation date in ISO 8601 format (e.g., `2023-06-03T21:25:28.987Z`) |
| `accountDeviceVector` | `string` | The account device vector (internal PlayStation identifier)                      |
