export interface BaseResponseDTO<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}
