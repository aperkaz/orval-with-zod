# Evaluating OpenAPI to typed-clients

The goal of this project is to evaluate the alternatives for http-client generation with runtime-checking from OpenAPI schemas.

The generated clients should be:

- typed (typescript types)
- runtime checks (zod)
- bonus: react-query wrapper

## Open questions

- URL or operationId as source of truth

  - `operationId` can have collisions cross backends, names are not following a standard.

  ```tsx
  api.getConversationsV1ConversationsGet();
  // VS
  api("GET", "/ai/assistant/v1/conversations");
  ```

## Orval: https://orval.dev/overview

The client-sdk function names are generated from the OpenAPI schema(`operationId`), by converting form `snake_case` to `lowerCamelCase` casing:

`"operationId": "_get_conversations_v1_conversations_get",`
👇
`getConversationsV1ConversationsGet`

The `operationId` can vary on how the OpenAPI schema is manages (code first or schema first), the backend framework and other factors.

Http-client API level collisions are possible when using the `operationId` as UUID.

### Axios + TypeScript (orval/axios-ts.ts)

`npx orval --input src/http-client/openapi.json --output src/http-client/axios-ts.ts`

### fetch + TypeScript (orval/fetch-ts.ts)

`npx orval --input src/http-client/openapi.json --output src/http-client/fetch-ts.ts --client fetch`

### Zod, only schemas (zod-only-schemas.ts)

`npx orval --input src/http-client/openapi.json --output src/http-client/zod-only-schemas.ts --client zod`

### Axios + runtime-zod

TODO
