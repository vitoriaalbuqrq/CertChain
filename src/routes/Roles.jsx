import { BiSolidSchool, BiSearch } from "react-icons/bi";

const Roles = () => {
  return (
    <section className="bg-dark-background h-screen p-10">
    <h1 className="text-white my-4 text-center md:text-xl md:my-10">Escolha uma das opções abaixo para continuar:</h1>
    <div className="flex flex-col gap-5 md:flex-row md:justify-center md:items-stretch md:px-32 ">
      <div className="border-solid border border-medium-gray rounded-2xl p-6 flex flex-col gap-3 bg-dark-background cursor-pointer hover:bg-secondary-bg lg:w-1/3">
        <BiSearch size={36} className="text-primary"/>
        <h3 className="text-white font-bold md:text-xl">Validar Certificado</h3>
        <p className="text-sm text-secondary-text">Se você deseja verificar a autenticidade de um certificado, escolha esta opção para consultar informações detalhadas e validar o documento com confiança.</p>
      </div>
      <div className="border-solid border border-medium-gray rounded-2xl p-6 flex flex-col gap-3 bg-dark-background cursor-pointer hover:bg-secondary-bg lg:w-1/3">
        <BiSolidSchool size={36} className="text-primary"/>
        <h3 className="text-white font-bold md:text-xl">Emitir Certificado</h3>
        <p className="text-sm text-secondary-text">Se você representa uma instituição ou é responsável pela emissão de certificados, esta opção permite criar e registrar certificações de forma segura e eficiente.</p>
      </div>
    </div>
    </section>
  )
}

export default Roles