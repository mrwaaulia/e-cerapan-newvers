import type { InputHTMLAttributes } from "react";

interface DatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {}

export default function DatePicker({
  className = "",
  ...props
}: DatePickerProps) {
  return (
    <input
      type="date"
      className={[
        "w-full rounded-md border border-gray-300 bg-white",
        "px-3 py-2.5 text-sm text-black",
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
