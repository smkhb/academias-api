export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Max numbers of checkins reached')
  }
}
