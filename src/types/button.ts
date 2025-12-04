export type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant = "primary" | "secondary" ;

export interface ButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;  
  className?: string;
  children?: React.ReactNode;
}
