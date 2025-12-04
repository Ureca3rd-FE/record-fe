export type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  type?: ButtonType;
  className?: string;
  children?: React.ReactNode;
}
