import { IoCloseOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

const Modal = ({ open, onClose, title, children }) => {
  return (
    <div onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors text-white 
      ${open ? "visible bg-black/70" : "invisible"}`}
    >
      <div onClick={(e) => e.stopPropagation()}
        className={`bg-secondary-gray rounded-lg shadow py-6 transition-all w-10/12 max-w-lg md:w-auto
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}>
        <div className="flex justify-start items-center gap-2 py-3 px-6 border-b border-gray-600">
          <FaRegCheckCircle className="w-8 h-8 text-green-500" />
          <h1 className="text-lg font-bold text-green-500">{title}</h1>
          <button type="button" onClick={onClose} className="ms-2 text-light-gray">
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>
        <div className="px-6 mt-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal