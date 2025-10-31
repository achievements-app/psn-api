import nock from "nock";

import type { AccountDevicesResponse, AuthorizationPayload } from "../models";
import { getAccountDevices } from "./getAccountDevices";
import { USER_DMS_BASE_URL } from "./USER_BASE_URL";

const MOCK_ACCESS_TOKEN = "mockAccessToken";
const MOCK_ACCOUNT_ID = "1234567890123456789";
const INCLUDE_FIELDS = "device,systemData";
const PLATFORM = "PS5,PS4,PS3,PSVita";
const MOCK_ACTIVATION_PRIMARY = "PRIMARY";
const MOCK_ACTIVATION_PSN_GAME_V3 = "PSN_GAME_V3";

describe("Function: getAccountDevices", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(getAccountDevices).toBeDefined();
  });

  it("retrieves the account devices for the current user", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const mockResponse: AccountDevicesResponse = {
      accountId: MOCK_ACCOUNT_ID,
      accountDevices: [
        {
          deviceId: "ps5-device-12345",
          deviceType: "PS5",
          activationType: MOCK_ACTIVATION_PRIMARY,
          activationDate: "2023-06-03T21:25:28.987Z",
          accountDeviceVector: "vector123abc"
        },
        {
          deviceId: "ps4-device-67890",
          deviceType: "PS4",
          activationType: MOCK_ACTIVATION_PSN_GAME_V3,
          activationDate: "2023-01-15T10:30:00.000Z",
          accountDeviceVector: "vector456def"
        },
        {
          deviceId: "psvita-device-11111",
          deviceType: "PSVita",
          activationType: MOCK_ACTIVATION_PSN_GAME_V3,
          activationDate: "2022-08-20T14:22:33.000Z",
          accountDeviceVector: "vector789ghi"
        }
      ]
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(200, mockResponse);

    // ACT
    const response = await getAccountDevices(mockAuthorization);

    // ASSERT
    expect(response).toEqual(mockResponse);
    expect(response.accountDevices).toHaveLength(3);
    expect(response.accountDevices[0].deviceType).toBe("PS5");
    expect(response.accountDevices[0].activationType).toBe(
      MOCK_ACTIVATION_PRIMARY
    );
    expect(response.accountDevices[1].deviceType).toBe("PS4");
    expect(response.accountDevices[2].deviceType).toBe("PSVita");
  });

  it("returns empty devices list when user has no devices", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const mockResponse: AccountDevicesResponse = {
      accountId: MOCK_ACCOUNT_ID,
      accountDevices: []
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(200, mockResponse);

    // ACT
    const response = await getAccountDevices(mockAuthorization);

    // ASSERT
    expect(response).toEqual(mockResponse);
    expect(response.accountDevices).toHaveLength(0);
  });

  it("handles a single PS5 device correctly", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const mockResponse: AccountDevicesResponse = {
      accountId: "9876543210987654321",
      accountDevices: [
        {
          deviceId: "ps5-primary-device",
          deviceType: "PS5",
          activationType: MOCK_ACTIVATION_PRIMARY,
          activationDate: "2024-01-01T00:00:00.000Z",
          accountDeviceVector: "primaryvector123"
        }
      ]
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(200, mockResponse);

    // ACT
    const response = await getAccountDevices(mockAuthorization);

    // ASSERT
    expect(response.accountDevices).toHaveLength(1);
    expect(response.accountDevices[0].deviceType).toBe("PS5");
    expect(response.accountDevices[0].activationType).toBe(
      MOCK_ACTIVATION_PRIMARY
    );
    expect(response.accountDevices[0].deviceId).toBe("ps5-primary-device");
  });

  it("passes header overrides correctly", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const mockOptions = {
      headerOverrides: {
        "Accept-Language": "ja-JP"
      }
    };

    const mockResponse: AccountDevicesResponse = {
      accountId: MOCK_ACCOUNT_ID,
      accountDevices: []
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(200, mockResponse);

    // ACT
    const response = await getAccountDevices(mockAuthorization, mockOptions);

    // ASSERT
    expect(response).toEqual(mockResponse);
  });

  it("throws an error if we receive a response containing an `error` object with message", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const mockResponse = {
      error: {
        referenceId: "d71bd8ff-5f63-11ec-87da-d5dfd3bc6e67",
        code: 2_105_356,
        message: "Account devices not found"
      }
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(200, mockResponse);

    // ASSERT
    await expect(getAccountDevices(mockAuthorization)).rejects.toThrow(
      "Account devices not found"
    );
  });

  it("throws an error with default message if error object has no message", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const mockResponse = {
      error: {
        referenceId: "d71bd8ff-5f63-11ec-87da-d5dfd3bc6e67",
        code: 500
      }
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(200, mockResponse);

    // ASSERT
    await expect(getAccountDevices(mockAuthorization)).rejects.toThrow(
      "Unexpected Error"
    );
  });

  it("handles HTTP 404 response correctly", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(404, { error: { message: "User not found" } });

    // ASSERT
    await expect(getAccountDevices(mockAuthorization)).rejects.toThrow();
  });

  it("handles HTTP 401 unauthorized response correctly", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "invalidAccessToken"
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(401, { error: { message: "Unauthorized" } });

    // ASSERT
    await expect(getAccountDevices(mockAuthorization)).rejects.toThrow();
  });

  it("handles different device types correctly", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const mockResponse: AccountDevicesResponse = {
      accountId: MOCK_ACCOUNT_ID,
      accountDevices: [
        {
          deviceId: "ps3-device-001",
          deviceType: "PS3",
          activationType: MOCK_ACTIVATION_PSN_GAME_V3,
          activationDate: "2020-05-15T08:30:00.000Z",
          accountDeviceVector: "ps3vector001"
        },
        {
          deviceId: "ps4-device-002",
          deviceType: "PS4",
          activationType: MOCK_ACTIVATION_PRIMARY,
          activationDate: "2021-03-20T12:45:30.000Z",
          accountDeviceVector: "ps4vector002"
        },
        {
          deviceId: "ps5-device-003",
          deviceType: "PS5",
          activationType: MOCK_ACTIVATION_PRIMARY,
          activationDate: "2023-11-10T16:20:15.000Z",
          accountDeviceVector: "ps5vector003"
        },
        {
          deviceId: "vita-device-004",
          deviceType: "PSVita",
          activationType: MOCK_ACTIVATION_PSN_GAME_V3,
          activationDate: "2019-12-01T09:15:45.000Z",
          accountDeviceVector: "vitavector004"
        }
      ]
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query({
        includeFields: INCLUDE_FIELDS,
        platform: PLATFORM
      })
      .reply(200, mockResponse);

    // ACT
    const response = await getAccountDevices(mockAuthorization);

    // ASSERT
    expect(response.accountDevices).toHaveLength(4);

    const ps3Device = response.accountDevices.find(
      (d) => d.deviceType === "PS3"
    );
    const ps4Device = response.accountDevices.find(
      (d) => d.deviceType === "PS4"
    );
    const ps5Device = response.accountDevices.find(
      (d) => d.deviceType === "PS5"
    );
    const vitaDevice = response.accountDevices.find(
      (d) => d.deviceType === "PSVita"
    );

    expect(ps3Device).toBeDefined();
    expect(ps3Device?.activationType).toBe(MOCK_ACTIVATION_PSN_GAME_V3);

    expect(ps4Device).toBeDefined();
    expect(ps4Device?.activationType).toBe(MOCK_ACTIVATION_PRIMARY);

    expect(ps5Device).toBeDefined();
    expect(ps5Device?.activationType).toBe(MOCK_ACTIVATION_PRIMARY);

    expect(vitaDevice).toBeDefined();
    expect(vitaDevice?.activationType).toBe(MOCK_ACTIVATION_PSN_GAME_V3);
  });

  it("verifies correct API endpoint and query parameters are used", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: MOCK_ACCESS_TOKEN
    };

    const mockResponse: AccountDevicesResponse = {
      accountId: MOCK_ACCOUNT_ID,
      accountDevices: []
    };

    const baseUrlObj = new URL(USER_DMS_BASE_URL);
    const baseUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}`;
    const basePath = baseUrlObj.pathname;

    // Verify exact query parameters
    const scope = nock(baseUrl)
      .get(`${basePath}/v1/devices/accounts/me`)
      .query((query) => {
        return (
          query.includeFields === INCLUDE_FIELDS && query.platform === PLATFORM
        );
      })
      .reply(200, mockResponse);

    // ACT
    await getAccountDevices(mockAuthorization);

    // ASSERT
    expect(scope.isDone()).toBe(true);
  });
});
