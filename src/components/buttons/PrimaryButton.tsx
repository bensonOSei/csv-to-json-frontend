import { FC } from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children }) => {
  return (
    <button
      type="button"
      className="px-3 py-1 text-center bg-blue-400 text-slate-50 rounded-md hover:bg-blue-500 transition-all text-sm flex items-center gap-1">
      {children}
    </button>
  );
};
