import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../components/forms/Container";
import Input from "../components/forms/Input";
import { ErrorMessage } from "../components/forms/ErrorMessage";
import Field from "../components/forms/Field";
import { useState } from "react";
import FileInput from "../components/forms/FileInput";
import { uploadToPinata } from "../services/pinataService";
import Modal from "../components/ui/Modal";
import CopyText from "../components/ui/CopyText";
import CryptoJS from "crypto-js";
import { generateCertificate } from "../utils/generateCertificate";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import FormHeader from "../components/forms/FormHeader";
import Button from "../components/ui/Button";
import { issueCertificate } from "../contracts/contractIntegration";


const issueCertificateFormSchema = z.object({
  recipientName: z.string().nonempty("O nome do destinatário é obrigatório."),
  certificateTitle: z.string().nonempty("O título do certificado é obrigatório."),
  issuerName: z.string().nonempty("O nome do emissor é obrigatório."),
  issueDate: z.string().nonempty("A data de emissão é obrigatória."),
  uploadCertificate: z.instanceof(FileList).optional(),
});

const IssueCertificate = () => {
  const [file, setFile] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [openModal, setOpenModal] = useState(false);
  const [certificateHash, setCertificateHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("")

  const methods = useForm({
    resolver: zodResolver(issueCertificateFormSchema),
    defaultValues: {
      issueDate: today,
    },
  });

  const handleFormSubmit = async (data) => {
    console.log(data); //TODO: Apenas para teste. Deve ser removido
    setIsLoading(true);
    try {
      let fileUrl = null;
      //Se o usuario enviou um pdf, faz o upload para o IPFS
      if (file) {
        //TODO: Precisa verificar se a organização é autorizada antes de fazer upload no pinata
        fileUrl = await uploadToPinata(file);
        console.log("Arquivo carregado no IPFS:", fileUrl);
      }
        //TODO: Analisar se vamos gerar PDF e enviar para o IPFS
        //const generatedPDF = generateCertificate(data);
        //const pdfFile = new File([generatedPDF], "certificado.pdf", { type: "application/pdf" });

        //fileUrl = await uploadToPinata(pdfFile);
        //console.log("Certificado gerado e carregado no IPFS:", fileUrl);
      
      const hash = generateCertificateHash(data, fileUrl);
      
      const certificateId = `${data.recipientName}`; //TODO: Temporario

      await issueCertificate({ ...data, certificateId, hash })

      setCertificateHash(hash);
      console.log("Hash do certificado:", hash);

      setOpenModal(true);

    } catch (error) {
      console.error(error);
      setMessage(error.message)
    }
    setIsLoading(false);
  };

  function onFileChange(file) {
    setFile(file || null);
  }

  const generateCertificateHash = (data, fileUrl = "") => {
    const certificateData = `
      RecipientName: ${data.recipientName}
      CertificateTitle: ${data.certificateTitle}
      IssuerName: ${data.issuerName}
      IssueDate: ${data.issueDate}
      FileURL: ${fileUrl}
    `;
    const hash = CryptoJS.SHA256(certificateData).toString(CryptoJS.enc.Hex);
    return hash;
  };

  return (
    <main className="bg-dark-background min-h-screen text-sm p-6 flex flex-col justify-start items-center md:pt-10 lg:text-base lg:pb-20">
      <FormHeader title="Emissão de Certificado" info="Preencha os dados abaixo para emitir um certificado. Após a emissão, o certificado estará pronto para ser consultado." />
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
              <FileInput onChange={onFileChange} label="Carregar certificado (opcional)" />
            </Field>

            <Button text="Emitir Certificado" />

            {isLoading && (
              <LoadingSpinner />
            )}
            {message && (
              <p>{message}</p>
            )}
          </form>
        </FormProvider>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Certificado emitido com sucesso!">
          <p className="mb-2">Hash para verificação:</p>
          <div className="flex justify-between p-1 border border-solid border-light-gray rounded-md">
            <CopyText info={certificateHash} />
          </div>
        </Modal>
      </Container>
    </main>
  );
};

export default IssueCertificate;
