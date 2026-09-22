import type { ReactNode } from "react";
import Alert from "@/components/ui/Alert";

type AlertMessageVariant = "info" | "success" | "warning" | "danger";

interface AlertMessageProps {
  message: ReactNode;
  variant?: AlertMessageVariant;
  className?: string;
}

export default function AlertMessage({
  message,
  variant = "warning",
  className = "",
}: AlertMessageProps) {
  return (
    <Alert variant={variant} className={className}>
      {message}
    </Alert>
  );
}
