export type Response<T = any> = {
  message: string;
  data: T;
};

export type ResponsePagination<T = any> = {
  message: string;
  pagination: {
    prev: string;
    next: string;
  };
  data: T;
};
