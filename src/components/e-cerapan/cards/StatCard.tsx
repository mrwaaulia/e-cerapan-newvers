import type { HTMLAttributes, ReactNode } from "react";

type StatCardColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "neutral"
  | "black";

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: string;
  valueColor?: StatCardColor;
}

const valueColorClasses: Record<StatCardColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
  neutral: "text-neutral",
  black: "text-black",
};

export default function StatCard({
  value,
  label,
  valueColor = "primary",
  className = "",
  ...props
}: StatCardProps) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <p
        className={[
          "text-3xl font-semibold leading-none",
          valueColorClasses[valueColor],
        ].join(" ")}
      >
        {value}
      </p>

      <p className="mt-2 text-sm text-neutral">{label}</p>
    </div>
  );
}
