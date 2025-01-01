import { FormProvider, useForm } from "react-hook-form"
import Container from "../components/forms/Container"
import { ErrorMessage } from "../components/forms/ErrorMessage"
import Field from "../components/forms/Field"
import FormHeader from "../components/forms/FormHeader"
import Input from "../components/forms/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Button from "../components/ui/Button"
import { addOrganization } from "../contracts/contractIntegration";
import { useState } from "react"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const registerInstitutionSchema = z.object({
  institutionAddress: z
    .string()
    .min(1, "O endereço da instituição é obrigatório")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Endereço inválido. Deve ser um endereço Ethereum válido."),
});

const RegisterInstitution = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const methods = useForm({
    resolver: zodResolver(registerInstitutionSchema),
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      await addOrganization(data.institutionAddress);
      console.log("Organização adicionada")
      setIsLoading(false);
    }catch (error) {
      console.log("Erro ao autorizar a instituição.", error)
    }
  }

  return (
    <main className="bg-dark-background min-h-screen text-sm p-6 flex flex-col justify-start items-center md:pt-10 lg:text-base lg:pb-20">
      <FormHeader title="Registrar Instituição" info="Informe o endereço público da instituição que você deseja autorizar para a emissão de certificados." />
      <Container>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-5"
          >
            <Field>
              <Input
                label="Endereço da Instituição"
                name="institutionAddress"
                type="text"
                placeholder="0xf08388Df8B32ACD1067eFF1E259B6771aa619F74"
              />
              <ErrorMessage name="institutionAddress" />
            </Field>
            <Button text="Autorizar Instituição" />
            {isLoading && (
              <LoadingSpinner/>
            )}
          </form>
        </FormProvider>
      </Container>
    </main>

  )
}

export default RegisterInstitution