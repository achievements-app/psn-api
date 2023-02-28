import type {
  AllCallOptions,
  AuthorizationPayload,
  TitleTrophiesResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { TITLE_BASE_URL } from "./TITLE_BASE_URL";
