import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../components/forms/Container";
import Input from "../components/forms/Input";
import { ErrorMessage } from "../components/forms/ErrorMessage";
import Field from "../components/forms/Field";
import { useState } from "react";
import FileInput from "../components/forms/FileInput";
import {uploadToPinata} from "../services/pinataService";

const issueCertificateFormSchema = z.object({
  recipientName: z.string().nonempty("O nome do destinatário é obrigatório."),
  certificateTitle: z.string().nonempty("O título do certificado é obrigatório."),
  issuerName: z.string().nonempty("O nome do emissor é obrigatório."),
  issueDate: z.string().nonempty("A data de emissão é obrigatória."),
  uploadCertificate: z.instanceof(FileList).optional(),
});

const IssueCertificate = () => {
  const [image, setImage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const methods = useForm({
    resolver: zodResolver(issueCertificateFormSchema),
    defaultValues: {
      issueDate: today,
    },
  });

  const handleFormSubmit = async (data) => {
    console.log(data); //TODO: Apenas para teste. Deve ser removido

    //TODO: Verificar se o usuario carregou algum certificado
    //Caso contrario, sera gerado um pdf com os dados do form e enviado para o IPFS
    try {
      const fileUrl = image ? await uploadToPinata(image) : null; // Verifica se há arquivo antes do upload
      if (fileUrl) {
        console.log("File URL:", fileUrl);
        setMessage("Upload bem-sucedido!");
      } else {
        console.log("Nenhum arquivo enviado.");
      }
    } catch (error) {
      console.error(error);
      setMessage(`Erro ao enviar o arquivo: ${error.message}`);
    }
  };

  function onFileChange(file) {
    setImage(file || null);
  } 

  return (
    <main className="bg-dark-background h-full text-sm p-6 flex flex-col justify-start items-center md:pt-10 lg:text-base lg: pb-20">
      <h1 className="text-2xl font-bold text-white">Emissão de Certificado</h1>
      <p className="text-secondary-text w-full md:w-2/3 lg:w-1/3 text-center mt-3 mb-10">Preencha os dados abaixo para emitir um certificado. Após a emissão, o certificado estará pronto para ser consultado.</p>
      <Container>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-5"
          >
            <Field>
              <Input
                label="Nome do destinatário"
                name="recipientName"
                type="text"
                placeholder="Digite o nome do destinatário"
              />
              <ErrorMessage name="recipientName" />
            </Field>

            <Field>
              <Input
                label="Título do certificado"
                name="certificateTitle"
                type="text"
                placeholder="Digite o título do certificado"
              />
              <ErrorMessage name="certificateTitle" />
            </Field>

            <Field>
              <Input
                label="Nome do emissor"
                name="issuerName"
                type="text"
                placeholder="Digite o nome da instituição ou pessoa emissora"
              />
              <ErrorMessage name="issuerName" />
            </Field>

            <Field>
              <Input
                label="Data de emissão"
                name="issueDate"
                type="date"
              />
              <ErrorMessage name="issueDate" />
            </Field>

            <Field>
              <FileInput onChange={onFileChange} label="Carregar modelo de certificado (opcional)"/>
            </Field>

            <button
              className="bg-primary rounded-full p-3 font-bold mt-4 text-white hover:opacity-90"
              type="submit"
            >
              Emitir Certificado
            </button>
          </form>
        </FormProvider>
      </Container>
    </main>
  );
};

export default IssueCertificate;
