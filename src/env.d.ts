/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

export type ValueOf<T> = T[keyof T];
export type Promiseable<T> = T | PromiseLike<T>;
