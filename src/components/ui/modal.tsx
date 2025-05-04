import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="absolute inset-0"
        onClick={() => onOpenChange(false)}
        aria-label="Fermer le modal"
      />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
          onClick={() => onOpenChange(false)}
          aria-label="Fermer"
        >
          ×
        </button>
        <div className="p-0">{children}</div>
      </div>
    </div>
  );
}; 