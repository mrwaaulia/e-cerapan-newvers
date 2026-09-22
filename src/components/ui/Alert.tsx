import type { HTMLAttributes } from "react";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
}

const variantClasses: Record<
  AlertVariant,
  {
    container: string;
    title: string;
    text: string;
  }
> = {
  info: {
    container: "bg-primary-hover text-primary",
    title: "text-primary",
    text: "text-primary",
  },
  success: {
    container: "bg-success-hover text-success",
    title: "text-success",
    text: "text-success",
  },
  warning: {
    container: "bg-secondary-hover text-warning",
    title: "text-warning",
    text: "text-warning",
  },
  danger: {
    container: "bg-danger-hover text-danger",
    title: "text-danger",
    text: "text-danger",
  },
};

export default function Alert({
  children,
  variant = "info",
  title,
  className = "",
  ...props
}: AlertProps) {
  const styles = variantClasses[variant];

  return (
    <div
      role="alert"
      className={[
        "flex gap-3 rounded-xl px-5 py-4",
        styles.container,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="mt-0.5 shrink-0">
        {variant === "warning" || variant === "danger" ? (
          <span className="text-lg font-bold">!</span>
        ) : (
          <span className="text-lg font-bold">i</span>
        )}
      </div>

      <div>
        {title && <p className={`font-semibold ${styles.title}`}>{title}</p>}

        <div className={`text-sm leading-6 ${styles.text}`}>{children}</div>
      </div>
    </div>
  );
}
