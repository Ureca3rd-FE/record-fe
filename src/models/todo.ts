export interface TodoDTO {
  id: number;
  content: string;
  complete: boolean;
  date: string;
}
//할 일 등록
export interface CreateTodoDTO {
  content: string;
  date: string;
}
//할 일 수정( 내용, 날짜 )
export interface UpdateTodoDTO {
  id: number;
  content?: string;
  date?: string;
}
//할 일 수정(완료 상태)
export interface UpdateTodoCompleteDTO {
  id: number;
  complete: boolean;
}
