import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-lg border border-gray-200 bg-white shadow-md",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
