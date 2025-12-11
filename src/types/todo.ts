export interface Todo {
  id: string;
  date: Date;
  time: string;
  content: string;
  complete: boolean;
}
//Todo Api연동, time은 실제로는 date에서 들어오는 시간 정보를 사용해야함
export interface TodoListProps {
  date: Date;
}
