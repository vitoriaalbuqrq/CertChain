import LinkButton from "../components/ui/LinkButton"

const Home = () => {
  return (
    <>
      <section className="relative z-[5] flex flex-col flex-1 justify-start items-center bg-dark-background h-screen w-full px-10 md:px-40 md:flex-col lg:flex-row 2xl:px-60">
        <div className="absolute z-[3] -left-[-3rem] top-[6rem] w-[20%] h-[20%] rounded-full bg-primary blur-[140px]" />
        <article>
          <h1 className="text-white text-3xl font-bold order-1 md:text-4xl 2xl:text-5xl">Emissão e Validação de <span className="text-primary">Certificados</span> com Blockchain</h1>
          <p className="text-secondary-text my-8 text-sm order-3 md:text-base">Valide a autenticidade de certificações e emita documentos digitais de forma segura e transparente. Simplifique a emissão e verificação, garantindo integridade, credibilidade e inovação.</p>
          <LinkButton to="/roles" text="Comece agora" />
        </article>
        <aside>
          <img className="w-9/12 mx-auto" src="/assets/img/img-certification.png" alt="Certification image" />
        </aside>
        <div className="absolute z-[3] -right-[-5rem] bottom-10 w-[20%] h-[20%] rounded-full bg-primary blur-[140px]" />
      </section>
    </>
  )
}

export default Home