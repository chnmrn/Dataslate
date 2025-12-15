"use client";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-md animate-fadeIn">
                {/* Header with title + X */}
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          )}

          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-xl leading-none"
          >
            X
          </button>
        </div>



        {children}
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
