import { useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;  // Accept JSX content
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Function to handle clicking outside the modal box
  const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal if clicked outside the modal box
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      {/* Modal */}
      <dialog
        open
        className="modal fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleClickOutside} // Handle click outside the modal box
      >
        <div ref={modalRef} className="modal-box relative">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{children}</div> {/* Render JSX content here */}
         
        </div>
      </dialog>
    </>
  );
};

export default Modal;
