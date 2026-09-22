import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "danger"
  | "warning"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover hover:text-primary",

  secondary: "bg-secondary text-black hover:bg-secondary-hover",

  outline:
    "border border-2 border-neutral bg-white text-neutral hover:bg-neutral hover:text-white",

  success: "bg-success text-white hover:bg-success-hover hover:text-success",

  danger: "bg-danger text-white hover:bg-danger-hover hover:text-danger",

  warning: "bg-warning text-white hover:bg-warning-hover hover:text-yellow/90",

  ghost: "bg-transparent text-neutral hover:bg-gray-100 hover:text-neutral",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-md font-semibold",
        "transition-colors duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
