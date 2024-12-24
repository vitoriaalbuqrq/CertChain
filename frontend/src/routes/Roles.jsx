import { BiSolidSchool, BiSearch } from "react-icons/bi";
import Card from "../components/ui/Card";

const Roles = () => {
  return (
    <section className="bg-dark-background h-screen p-10">
      <h1 className="text-white my-4 text-center md:text-xl md:my-10">Escolha uma das opções abaixo para continuar:</h1>
      <div className="flex flex-col gap-5 md:flex-row md:justify-center md:items-stretch md:px-32 ">
        <Card
          icon={<BiSearch />}
          title="Validar Certificado"
          description="Se você deseja verificar a autenticidade de um certificado, escolha esta opção para consultar informações detalhadas e validar o documento com confiança."
          />
        <Card
          icon={<BiSolidSchool />}
          title="Emitir Certificado"
          description="Se você representa uma instituição ou é responsável pela emissão de certificados, esta opção permite criar e registrar certificações de forma segura e eficiente."
          />
      </div>
    </section>
  )
}

export default Roles