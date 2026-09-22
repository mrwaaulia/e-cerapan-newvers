import type { InputHTMLAttributes } from "react";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "checked" | "onChange"
> {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  inputClassName?: string;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  name,
  className = "",
  inputClassName = "",
  disabled = false,
  ...props
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={["flex flex-wrap items-center gap-5", className]
        .filter(Boolean)
        .join(" ")}
    >
      {options.map((option) => {
        const isDisabled = option.disabled || disabled;
        const isChecked = value === option.value;

        return (
          <label
            key={option.value}
            className={[
              "inline-flex items-center gap-2 text-sm text-neutral",
              isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            ].join(" ")}
          >
            <input
              {...props}
              type="radio"
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => onChange?.(option.value)}
              className={[
                "h-4 w-4 border-gray-300",
                "text-primary",
                "focus:ring-primary",
                inputClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            />

            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
