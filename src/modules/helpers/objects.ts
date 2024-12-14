import {
  ArrayMapperFunction,
  BodyParserKey,
  ExtractTypes,
} from "@/src/@types/objects";
import { isObject } from "@/src/lib/verifications";
import { NextApiRequest } from "next";

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const shallowCopy = { ...obj };
  keys.forEach((key) => {
    delete shallowCopy[key];
  });
  return shallowCopy;
}

export function objectParser<BodyKeys extends BodyParserKey<unknown>[]>(
  body: unknown,
  keys: BodyKeys
): ExtractTypes<BodyKeys> {
  const keyLength = keys.length;
  const finalValues = [] as ExtractTypes<BodyKeys>;

  if (!isObject(body)) {
    finalValues.push(...createArray(keyLength, () => undefined));
  } else {
    for (const [key, verify] of keys) {
      const value = body[key as keyof typeof body];
      const keyCheck = key in body && verify(value);
      finalValues.push(keyCheck ? value : undefined);
    }
  }

  return finalValues;
}

export async function parseJsonBody(req: NextApiRequest): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", (err) => reject(err));
  });
}

export function getKeyConditionally<Object, Key extends string, DefaultValue>(
  obj: Object,
  key: Key,
  defaultValue: DefaultValue
): DefaultValue {
  return (
    isObject(obj)
      ? key in obj
        ? obj[key as unknown as keyof typeof obj]
        : defaultValue
      : defaultValue
  ) as DefaultValue;
}

export function createArray<OutputType>(
  elementSize: number,
  mapperFunction: ArrayMapperFunction<OutputType>
): OutputType[] {
  return Array.from({ length: elementSize }, (_, index) =>
    mapperFunction(index)
  );
}
