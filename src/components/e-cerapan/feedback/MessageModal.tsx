"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type MessageVariant = "success" | "warning" | "danger" | "info";

interface MessageModalProps {
  open: boolean;
  onClose: () => void;

  title?: string;
  message: string;

  variant?: MessageVariant;
  buttonText?: string;
}

const variantTitleClasses: Record<MessageVariant, string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-primary",
};

export default function MessageModal({
  open,
  onClose,
  title = "Informasi",
  message,
  variant = "info",
  buttonText = "OK",
}: MessageModalProps) {
  return (
    <Modal open={open} onClose={onClose} className="max-w-md">
      <div className="text-center">
        <h2
          className={[
            "text-lg font-semibold",
            variantTitleClasses[variant],
          ].join(" ")}
        >
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-neutral">{message}</p>

        <div className="mt-6">
          <Button fullWidth onClick={onClose}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
