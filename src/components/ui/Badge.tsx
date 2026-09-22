import type { HTMLAttributes } from "react";

type BadgeVariant = "primary" | "success" | "danger" | "warning" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-hover text-primary",
  success: "bg-success-hover text-success",
  danger: "bg-danger-hover text-danger",
  warning: "bg-warning-hover text-warning",
  neutral: "bg-gray-100 text-neutral",
};

export default function Badge({
  children,
  variant = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1",
        "text-xs font-semibold",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
