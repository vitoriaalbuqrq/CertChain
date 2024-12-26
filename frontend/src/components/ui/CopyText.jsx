import { useState } from "react"

const CopyText = () => {
  const [copyText, setCopyText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setIsCopied(!isCopied);
    console.log('clicou')
  }

  return (
    <>
      {/* TODO: Adicionar hash gerado no input */}
      <input type="text" readOnly value={copyText} onChange={(e)=>setCopyText(e.target.value)} className="w-full bg-transparent outline-none border-none text-light-gray px-2" />
      <button onClick={handleCopy} className={`text-white py-2 px-3 rounded-md hover:opacity-80 ${isCopied ? 'bg-gray-500' : 'bg-green-600'}`}>Copiar</button>
    </>
  )
}

export default CopyText