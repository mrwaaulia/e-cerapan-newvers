import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export default function Checkbox({
  label,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-neutral">
      <input
        type="checkbox"
        className={[
          "h-4 w-4 rounded border-gray-300",
          "text-primary focus:ring-primary",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {label && <span>{label}</span>}
    </label>
  );
}
