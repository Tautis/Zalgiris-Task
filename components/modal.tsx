interface ModalProps{
    isOpen:boolean;
    onClose:()=>void;
    children:React.ReactNode;
}

const Modal:React.FC<ModalProps> = ({isOpen,onClose,children})=>{
    if (!isOpen) return null;

    return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25" onClick={onClose}>
      <div className="bg-[#001009] p-6 rounded-lg shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-3 text-red-900 hover:text-gray-800 text-xl font-bold" onClick={onClose}>
        X
        </button>
        {children}
      </div>
    </div>
    )
}

export default Modal;