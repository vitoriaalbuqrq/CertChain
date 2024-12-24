import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../components/forms/Container";
import Input from "../components/forms/Input";
import { ErrorMessage } from "../components/forms/ErrorMessage";
import Field from "../components/forms/Field";

const issueCertificateFormSchema = z.object({
  recipientName: z.string().nonempty("O nome do destinatário é obrigatório."),
  certificateTitle: z.string().nonempty("O título do certificado é obrigatório."),
  issuerName: z.string().nonempty("O nome do emissor é obrigatório."),
  issueDate: z.string().nonempty("A data de emissão é obrigatória."),
  uploadCertificate: z.instanceof(FileList).optional(),
});

const IssueCertificate = () => {
  const methods = useForm({
    resolver: zodResolver(issueCertificateFormSchema),
  });

  const handleFormSubmit = (data) => {
    console.log(data);
  };

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
                placeholder="Selecione a data de emissão"
              />
              <ErrorMessage name="issueDate" />
            </Field>

            <Field>
              <Input
                label="Carregar certificado (opcional)"
                name="uploadCertificate"
                type="file"
                placeholder=""
              />
              <ErrorMessage name="uploadCertificate" />
            </Field>

            <button
              className="bg-primary rounded-full p-3 font-bold mt-4"
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
