export type RecursiveObject<
  Type,
  Depth extends number,
  CurrentDepth extends unknown[] = []
> = CurrentDepth["length"] extends Depth
  ? Type
  :
      | Type
      | PartialRecord<RecursiveObject<Type, Depth, [unknown, ...CurrentDepth]>>;

export type PartialRecord<Type> = Partial<Record<string, Type>>;

export type VerificationFunction = (input: unknown) => boolean;

export interface ObjectVerificationData {
  [key: string]: [VerificationFunction, VerificationFunction[]?];
}

export type ArrayMapperFunction<OutputType> = (index: number) => OutputType;

export type BodyParserKey<Type> = readonly [
  Key: string,
  Verification: (input: unknown) => input is Type
];

export type ExtractTypes<T extends readonly BodyParserKey<unknown>[]> = {
  [K in keyof T]: T[K] extends BodyParserKey<infer U> ? U | undefined : never;
};
