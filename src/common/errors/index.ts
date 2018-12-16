/*
 * How to define errors in typescript
 * https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
 */

export class RepoNotDefinedError extends Error {
  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = RepoNotDefinedError.name
  }
}
