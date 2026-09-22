import type { HTMLAttributes, ReactNode } from "react";
import Card from "@/components/ui/Card";

interface FormCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
}

export default function FormCard({
  title,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
  ...props
}: FormCardProps) {
  return (
    <Card
      className={["overflow-hidden", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div
        className={[
          "border-b border-gray-200 bg-gray-100 px-6 py-3.5",
          headerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <h2 className="text-sm font-semibold text-black">{title}</h2>
      </div>

      <div className={["p-6", contentClassName].filter(Boolean).join(" ")}>
        {children}
      </div>
    </Card>
  );
}
