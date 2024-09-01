import { FC } from "react";

type ButtonType = "button" | "submit" | "reset";


interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  disabled?: boolean
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="px-3 py-1 text-center bg-blue-400 text-slate-50 rounded-md hover:bg-blue-500 transition-all text-sm flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-30">
      {children}
    </button>
  );
};
