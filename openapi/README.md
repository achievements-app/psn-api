# PSN trophy OpenAPI contract

[`psn.openapi.yaml`](./psn.openapi.yaml) is a community [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) description of the trophy HTTP API used by [psn-api](../README.md). Sony does not publish this specification. Schemas are in the YAML. Example bodies are sanitized excerpts in [`fixtures/`](./fixtures/); they are incomplete pages so do not infer pagination or counts from their array lengths.

Send a PSN bearer access token. Use `accountId=me` for the signed-in account. Set `npServiceName` to `trophy` for PS3, PS4, and PS Vita, or `trophy2` for PS5. Trophy group IDs are `default`, a value such as `001`, or `all`. Follow `nextOffset` until the field is absent.

The contract describes HTTP responses. Error payloads and SDK transformations are unspecified. `info.version` (`0.1.0`) versions this file independently of the npm package. Pin a git commit when consuming it, and keep `fixtures/` beside the YAML so its examples resolve.

```sh
pnpm openapi:lint   # Redocly
pnpm openapi:test   # fixtures against response schemas; no credentials or network
```

Both also run as part of [`pnpm verify`](../package.json).
