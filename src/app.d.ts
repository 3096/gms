// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      sql: import('postgres').Sql<Record<string, never>>;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
