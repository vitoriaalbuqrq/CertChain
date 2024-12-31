import { useState } from "react"

const CopyText = ({ info }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(info);
    setIsCopied(!isCopied);
    setTimeout(() => setIsCopied(false), 2000); 0
  }

  return (
    <div className="flex justify-between w-full h-auto">
      <textarea
        readOnly
        value={info}
        className="w-full bg-transparent resize-none outline-none overflow-auto border-none text-light-gray px-2" />
      <button
        onClick={handleCopy}
        className={`text-white py-2 px-3 rounded-md hover:opacity-80 ${isCopied ? 'bg-gray-500' : 'bg-green-600'}`}>{isCopied ? "Copiado" : "Copiar"}</button>
    </div>
  )
}

export default CopyText