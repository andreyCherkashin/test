export interface IMapper<T, U> {
  (json: T): U;
}
