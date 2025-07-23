import * as schemas from "../zod-schemas";
import * as api from "../fetch-client";

type FunctionOnly<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

type Api = typeof api;
type Schemas = typeof schemas;

type ValidateResponse<T extends keyof Api> = Api[T] extends (
  ...args: any[]
) => Promise<unknown>
  ? (...args: Parameters<Api[T]>) => ReturnType<Api[T]>
  : never;
type WrappedApi = {
  [K in FunctionOnly<keyof Api>]: ValidateResponse<K>;
};

export const validatedApi = {} as WrappedApi;

for (const key in api) {
  const apiMethod = key as keyof FunctionOnly<Api>;
  const schemaName = `${apiMethod}Response` as keyof Schemas;

  const fn = api[apiMethod];
  const responseSchema = schemas[schemaName];

  if (typeof fn === "function") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validatedApi[apiMethod] = async (...args: any) => {
      const result = await fn(...args);
      if (typeof result === "string" || !responseSchema) return result;

      const r = responseSchema.safeParse(result.data);
      console.log(JSON.stringify(r));

      return result;
    };
  }
}
