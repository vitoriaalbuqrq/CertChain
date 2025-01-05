import { FormProvider, useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { z } from "zod";
import Container from "../components/forms/Container"
import Field from "../components/forms/Field"
import Input from "../components/forms/Input"
import FormHeader from "../components/forms/FormHeader";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "../components/forms/ErrorMessage";
import Modal from "../components/ui/Modal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Button from "../components/ui/Button";
import { isCertificateValid, getCertificate } from "../contracts/contractIntegration";
import useToast from "../hooks/useToast";

const validateCertificateSchema = z.object({
  certificateId: z.string().nonempty("Você deve fornecer o ID do certificado."),
})

const ValidateCertificate = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState(false);
  const [ipfsUrl, setIpfsUrl] = useState("");

  const methods = useForm({
    resolver: zodResolver(validateCertificateSchema),
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    let ipfsUrl = "";

    try {
      const isValid = await isCertificateValid(data.certificateId)

      if(isValid) {
        ipfsUrl = await getCertificate(data.certificateId);
        setValidationMessage(true)
      } else {
        setValidationMessage(false);
      }
    } catch (error) {
      useToast("Erro na solicitação!", "error");
    }
    setIsLoading(false);
    setIpfsUrl(ipfsUrl)
    setOpenModal(true);
  }

  return (
    <main className="bg-dark-background min-h-screen text-sm p-6 flex flex-col justify-start items-center md:pt-24 lg:text-base lg:pb-20">
      <FormHeader title="Verificação de certificado" info="Confirme a autenticidade de um certificado fornecendo o ID único correspondente." />
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
            <div className="flex flex-col gap-4 items-center">
              <p className="text-white">Certificado autêntico e registrado na blockchain.</p>
              <Link to={ipfsUrl} target="_blank" className="bg-gray-600 py-3 px-5 rounded-full font-bold text-white text-center w-1/2 hover:opacity-80">Visualizar Certificado</Link>
            </div>
          ) : (
            <p>O certificado não é autêntico ou não foi registrado na blockchain.</p>
          )}
        </Modal>
      </Container>
    </main>
  )
}

export default ValidateCertificate