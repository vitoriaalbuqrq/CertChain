import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Container from "../components/forms/Container"
import Field from "../components/forms/Field"
import Input from "../components/forms/Input"
import FormHeader from "../components/forms/FormHeader";
import FileInput from "../components/forms/FileInput";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "../components/forms/ErrorMessage";
import Modal from "../components/ui/Modal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Button from "../components/ui/Button";
import { isCertificateValid, getCertificate } from "../contracts/contractIntegration";
import useToast from "../hooks/useToast";

const validateCertificateSchema = z.object({
  certificateId: z.string().optional(),
  certificateFile: z.instanceof(FileList).optional(),
}).refine(data => data.certificateId || data.certificateFile, {
  message: "Você deve fornecer o ID do certificado ou carregar um arquivo PDF.",
  path: ["certificateId"],
});

const ValidateCertificate = () => {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState(false);

  const methods = useForm({
    resolver: zodResolver(validateCertificateSchema),
  });

  const handleFormSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    //TODO: Verificar se pdf esta no IPFS ou
    //TODO: Buscar por ID do certificado

    try {
      const isValid = await isCertificateValid(data.certificateId)
      console.log(isValid)
      isValid ? setValidationMessage(true) : setValidationMessage(false);
    } catch (error) {
      useToast("Erro na solicitação!", "error");
    }
    console.log(validationMessage)
    setIsLoading(false);
    setOpenModal(true)
  }

  function onFileChange(file) {
    setFile(file || null);
  }

  return (
    <main className="bg-dark-background min-h-screen text-sm p-6 flex flex-col justify-start items-center md:pt-10 lg:text-base lg:pb-20">
      <FormHeader title="Verificação de certificado" info="Confirme a autenticidade de um certificado fornecendo o ID único correspondente ou enviando o arquivo PDF do certificado para verificação." />
      <Container>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-5"
          >
            <Field>
              <Input
                label="ID do certificado"
                name="certificateId"
                type="text"
                placeholder="Digite o ID do certificado"
              />
              <ErrorMessage name="certificateId" />
            </Field>

            <div className="flex items-center justify-center w-full my-3 h-px">
              <div className="h-px w-full bg-gray-500"></div>
              <span className="px-3 text-gray-500 font-medium">ou</span>
              <div className="h-px w-full bg-gray-500"></div>
            </div>

            <Field>
              <FileInput onChange={onFileChange} label="Carregar certificado" />
            </Field>

            <Button text="Verificar Certificado" />

            {isLoading && (
              <LoadingSpinner />
            )}
          </form>
        </FormProvider>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          validationMessage={validationMessage}>
          {validationMessage ? (
            <div className="text-center">
              <Button text="Visualizar Certificado" />
            </div>
          ) : (
            <p>Certificado não registrado.</p>
          )}
        </Modal>
      </Container>
    </main>
  )
}

export default ValidateCertificate