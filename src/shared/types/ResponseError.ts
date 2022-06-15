interface DetailError<
  Data extends {},
  Params extends {},
  Name = keyof Data | keyof Params,
  Value = Data[keyof Data] | Params[keyof Params]
  > {
  name: Name;
  value: Value;
  message: string;
  code?: string;
}

export interface ResponseError<Data = any, Params = any> {
  /** Код ошибки, для каждого запроса свой */
  error: string;
  /** Детали ошибки, актуально для запросов с параметрами */
  message: DetailError<Data, Params>[] | string;
}
