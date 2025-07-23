export default {
  petstore: {
    input: "src/http-client/openapi.json",
    output: {
      target: "src/http-client/fetch+zod/fetch-zod.ts",
      client: "fetch",
      override: {
        mutator: {
          path: "src/http-client/fetch+zod/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
};
