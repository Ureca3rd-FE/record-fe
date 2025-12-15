export interface BaseResponseDTO<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

export type PaiginationDTO<T> = BaseResponseDTO<{
  totalPage: number;
  totalCount: number;
  isLast: boolean;
  isFirst: boolean;
  data: T;
}>;
