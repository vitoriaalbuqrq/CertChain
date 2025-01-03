# CertChain

Este projeto propõe uma aplicação que utiliza a tecnologia blockchain para emissão, validação e armazenamento de certificados digitais. A solução é projetada para oferecer maior segurança, transparência e confiabilidade no gerenciamento de certificações acadêmicas, profissionais ou de eventos.

## Funcionalidades:
- **Emissão de Certificados**: Os certificados são gerados em formato PDF e registrados na blockchain, garantindo sua integridade e imutabilidade.
- **Validação**: Usuários podem verificar a autenticidade de um certificado consultando o hash armazenado na blockchain.
- **Armazenamento Descentralizado**: Certificados em PDF são armazenados no IPFS (InterPlanetary File System), garantindo disponibilidade e integridade dos arquivos.

---

## Pré-requisitos

⚠️ Node.js (versão 14 ou superior)

Certifique-se de ter o Node.js instalado em sua máquina, pois ele é necessário para executar o projeto. Além disso, você precisará instalar as dependências do projeto utilizando o npm (Node Package Manager).

## Configuração inicial
Para utilizar a aplicação, siga as etapas abaixo:

1. Clone o repositório remoto para a sua máquina local:

```bash
git clone https://github.com/vitoriaalbuqrq/CertChain
```
2. Após clonar o repositório, entre no diretório da aplicação:
   
```bash
cd CertChain/fronted
```
3. No diretório do projeto, execute o comando abaixo para instalar as dependências necessárias:

```bash
npm install
```

4. Execute o comando a seguir para rodar a aplicação:
   
```bash
npm run dev
```
O endereço do servidor local será exibido no terminal. Copie o link gerado e insira-o em seu navegador para interagir com a página do projeto.

---

## Tela inicial
Na tela inicial, você pode escolher entre as duas principais funcionalidades da aplicação:
- **Validar um Certificado**: Verifique a autenticidade de um certificado armazenado na blockchain.
- **Emitir um Certificado**: Gere e registre um novo certificado digital.
Basta clicar no botão "Comece Agora" para iniciar.

## Verificação de certificados
Na aba de verificação, você pode validar um certificado de duas maneiras:
- **Inserindo o ID do Certificado**: Digite o identificador único gerado quando o certificado foi registrado na blockchain.
- **Enviando o Arquivo PDF**: Faça upload do arquivo do certificado para verificar sua integridade e autenticidade.
Essa funcionalidade garante a segurança e confiabilidade do processo de validação.

## Emissão de Certificado 
Na aba de emissão, você pode criar um novo certificado fornecendo as seguintes informações:
- **Nome do Destinatário**: O nome da pessoa que receberá o certificado.
- **Título do Certificado**: A descrição que identifica o propósito do certificado.
- **Nome do Emissor**: A entidade ou pessoa responsável pela emissão.
- **Data de Emissão**: A data em que o certificado foi gerado.
Além disso, você pode optar por fazer upload de um certificado PDF já pronto, que será registrado diretamente na blockchain para validação posterior.

## Registrar Instituição
Na aba de registro, é possível cadastrar novas instituições autorizadas a emitir certificados. Para isso, deve ser fornecida a chave pública da instituição. Ao ser registrada, a instituição é incluída na lista de entidades confiáveis do sistema, permitindo que seus certificados sejam emitidos e validados com segurança.

---

## Testes
Para garantir o funcionamento correto do sistema, foram implementados testes que são executados automaticamente no Git sempre que ocorre alguma alteração no código. Esses testes estão divididos em duas categorias:

### Testes no Front-End
Os testes do front-end têm como objetivo validar a interface e impedir ações inadequadas dos usuários. Eles verificam:

- **Emissão de Certificados**: Impede que o usuário emita certificados com campos obrigatórios vazios.
- **Registro de Instituições**: Garante que instituições não sejam registradas com campos vazios ou endereços inválidos.
- **Validação de Certificados**: Confirma a funcionalidade de validação, exibindo mensagens apropriadas ao receber dados válidos ou inválidos.

### Testes no Back-End
Os testes do back-end foram desenvolvidos para validar a lógica do sistema e garantir o correto funcionamento das operações principais. Eles verificam:

- **Geração de Certificados**: Confirma que os certificados são gerados corretamente com os dados fornecidos.
- **Busca de Certificados Inexistentes**: Valida o comportamento esperado ao buscar um certificado que não existe.
- **Emissão por Múltiplas Organizações**: Garante que diferentes organizações possam emitir certificados de forma independente.
- **Retorno de Dados de Certificados**: Verifica se as informações dos certificados são retornadas corretamente.
