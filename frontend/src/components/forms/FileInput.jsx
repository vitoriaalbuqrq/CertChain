import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import { FaRegFile } from "react-icons/fa";

const FileInput = ({ onChange, label }) => {
  const [file, setFile] = useState(null);

  const removeFile = useCallback(() => {
    setFile(null);
    if (onChange) onChange(null); 
  }, [onChange]);

  const onDrop = useCallback((files) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    if (onChange) onChange(selectedFile); 
  }, [onChange]);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  if (file) return <HasFile file={file} removeFile={removeFile} />;

  return <Input dropzone={dropzone} label={label}/>;
};


const Input = ({ dropzone, label }) => {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <>
    <label className="text-white text-sm" htmlFor="">{label}</label>
    <div {...getRootProps()}
      className={`w-full py-3 rounded-lg bg-secondary-gray border-dashed border mt-2
      ${isDragActive ? 'border-primary' : 'border-light-gray'}`}>
      <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
          <IoCloudUploadOutline className={`w-10 h-10 mb-3 ${isDragActive ? 'text-primary' : 'text-light-gray'}`} />
          {isDragActive ? (
            <p className="font-bold text-sm text-primary">Solte para adicionar</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-400 text-center">
                <span className="font-bold">Clique para enviar</span> ou arraste até aqui
              </p>
              <p className="text-gray-400 text-sm">PDF</p>
            </>
          )}
        </div>
      </label>
      <input {...getInputProps()} className="hidden"/>
    </div>
    </>
  )
};

const HasFile = ({ file, removeFile }) => {
  return (
    <div className="w-full py-3 rounded-lg bg-secondary-gray border-dashed border flex justify-center items-center">
      <div className="bg-white w-2/3 rounded-md shadow-md flex gap-3 items-center justify-between px-2 text-gray-500">
        <FaRegFile className="w-5 h-5 my-4 ml-4" />
        <span className="text-sm my-4 mr-auto">{file?.name}</span>
        <button type="button" onClick={removeFile} className="place-self-start mt-1 p-1">
          <IoCloseOutline className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FileInput