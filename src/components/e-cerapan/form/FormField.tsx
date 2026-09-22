import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

export default function FormField({
  label,
  children,
  required = false,
  error,
  helperText,
  className = "",
}: FormFieldProps) {
  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      <label className="mb-2 block text-xs font-medium text-black">
        {label}

        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {error ? (
        <p className="mt-1.5 text-xs text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-neutral">{helperText}</p>
      ) : null}
    </div>
  );
}
