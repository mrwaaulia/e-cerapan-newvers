"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;

  children?: React.ReactNode;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Konfirmasi",
  description,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  children,
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      closeOnOverlayClick={!loading}
    >
      <div className="space-y-5">
        {description && (
          <p className="text-sm leading-6 text-neutral">{description}</p>
        )}

        {children}

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button fullWidth onClick={onConfirm} disabled={loading}>
            {loading ? "Memproses..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
