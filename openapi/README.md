# PSN trophy OpenAPI contract

[`psn.openapi.yaml`](./psn.openapi.yaml) is a community [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) description of the trophy HTTP API used by [psn-api](../README.md). Sony does not publish this specification. Schemas are in the YAML. Files in [`fixtures/`](./fixtures/) are OpenAPI Example Objects with sanitized response excerpts under `value`; they are incomplete pages so do not infer pagination or counts from their array lengths.

Send a PSN bearer access token. Use `accountId=me` for the signed-in account. Set `npServiceName` to `trophy` for PS3, PS4, and PS Vita, or `trophy2` for PS5. Trophy group IDs are `default`, a value such as `001`, or `all`. Follow `nextOffset` until the field is absent.

The contract describes HTTP responses. Error payloads and SDK transformations are unspecified. `info.version` (`0.1.0`) versions this file independently of the npm package. Pin a git commit when consuming it, and keep `fixtures/` beside the YAML so its examples resolve.

```sh
pnpm openapi:lint   # Redocly validates the specification and example bodies
pnpm openapi:test   # fixture-reference coverage and endpoint-specific contract checks
```

Both checks run as part of [`pnpm verify`](../package.json), without PSN credentials or live API calls. The contract tests also run in the normal Vitest suite.

For now, keep this specification and the matching TypeScript models and endpoints in sync when changing either. We plan to generate the TypeScript client from OpenAPI soon so this manual step will eventually be replaced by code generation and CI checks.
