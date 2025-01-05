import { IoCloseOutline } from "react-icons/io5";
import { FaRegCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Modal = ({ open, onClose, title, validationMessage, children }) => {
  const isValid = validationMessage;
  const icon = isValid ? (
    <FaRegCheckCircle className="w-8 h-8 text-green-500" />
  ) : (
    <FaExclamationCircle className="w-8 h-8 text-red-500" />
  );
  const titleColor = isValid ? "text-green-500" : "text-red-500";
  const titleText = isValid ? "Certificado válido!" : "Certificado inválido!";

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors text-white 
      ${open ? "visible bg-black/70" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-secondary-gray rounded-lg shadow py-6 transition-all w-10/12 max-w-xl
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <div className="flex justify-between items-center gap-2 py-3 px-6 border-b border-gray-600">
          <div className="flex gap-3 items-center">
            {icon}
            <h1 className={`text-base font-bold ${titleColor} md:text-lg lg:text-xl`}>
              {title || titleText}
            </h1>
          </div>
          <button type="button" onClick={onClose} className="ms-2 text-light-gray">
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>
        <div className="px-6 mt-6">
          <div className={isValid ? "text-green-500" : ""}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
