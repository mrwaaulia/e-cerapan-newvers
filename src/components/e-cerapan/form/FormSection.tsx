import type { HTMLAttributes, ReactNode } from "react";

interface FormSectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function FormSection({
  title,
  description,
  children,
  className = "",
  ...props
}: FormSectionProps) {
  return (
    <section
      className={["space-y-5", className].filter(Boolean).join(" ")}
      {...props}
    >
      {(title || description) && (
        <div>
          {title && (
            <h3 className="text-sm font-semibold text-black">{title}</h3>
          )}

          {description && (
            <p className="mt-1 text-xs leading-5 text-neutral">{description}</p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
