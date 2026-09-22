import type { HTMLAttributes, ReactNode } from "react";

interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  right?: ReactNode;
}

export default function FormActions({
  left,
  right,
  className = "",
  ...props
}: FormActionsProps) {
  return (
    <div
      className={[
        "mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="flex-1">{left}</div>

      <div className="flex-1">{right}</div>
    </div>
  );
}
