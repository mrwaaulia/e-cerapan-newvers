import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={[
        "min-h-25 w-full resize-y rounded-md",
        "border border-gray-300 bg-white",
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
