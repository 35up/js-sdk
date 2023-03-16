export function parseUnixTimestamp(timestamp: string): Date {
  return new Date(parseInt(timestamp, 10) * 1000);
}

type TWithoutUndefinedValues<T> = {
  [K in keyof T]: T[K] extends undefined ? never : Exclude<T[K], undefined>
};

export function stripUndefined<T>(obj: T): TWithoutUndefinedValues<T> {
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .filter(entry => entry[1] !== undefined),
  ) as TWithoutUndefinedValues<T>;
}
