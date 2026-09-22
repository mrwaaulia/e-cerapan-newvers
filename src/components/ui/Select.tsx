import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  placeholder?: string;
}

export default function Select({
  options = [],
  placeholder,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
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
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
