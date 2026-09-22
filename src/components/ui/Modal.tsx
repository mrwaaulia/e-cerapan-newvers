"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;

  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;

  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  title,
  description,
  className = "",
  contentClassName = "",
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={[
          "relative w-full max-w-lg",
          "rounded-xl bg-white shadow-xl",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-black">{title}</h2>
            <p className="text-xs text-neutral">{description}</p>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup modal"
                className="rounded-md p-1 text-neutral hover:bg-gray-100 hover:text-black"
              >
                ×
              </button>
            )}
          </div>
        )}

        {!title && showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="absolute right-4 top-4 z-10 rounded-md p-1 text-neutral hover:bg-gray-100 hover:text-black"
          >
            ×
          </button>
        )}

        <div className={["p-6", contentClassName].join(" ")}>{children}</div>
      </div>
    </div>
  );
}
