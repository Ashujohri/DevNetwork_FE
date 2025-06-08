// Common API Response Type with Generics
export type CommonApiResponse<T = undefined> = {
  status: string | undefined | null;
  message: string | undefined | null;
  data?: T; // For the data you need to fetch, otherwise will be undefined
};
