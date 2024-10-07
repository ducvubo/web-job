export interface IDataQueueJob<T> {
  action: string
  data: T
}
