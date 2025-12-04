export interface ModalProps {
  open: boolean;
  onClose: () => void;

  title?: string; //제목
  description?: string; //내용
  buttonText?: string;   //버튼 문구
  children?: React.ReactNode; //버튼문구 -> 사용자지정
}
