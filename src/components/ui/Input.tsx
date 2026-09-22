import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={[
        "w-full rounded-md border border-gray-300 bg-white",
        "px-3 py-2.5 text-sm text-black",
        "placeholder:text-gray-400",
        "outline-none",
        "transition-colors duration-200",
        "focus:border-primary focus:ring-1 focus:ring-primary",
        "disabled:cursor-not-allowed disabled:bg-gray-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
