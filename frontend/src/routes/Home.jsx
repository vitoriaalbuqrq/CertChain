import { Link } from "react-router-dom";
import Footer from "../components/layouts/Footer"
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className="flex flex-col flex-1 justify-start items-center bg-dark-background h-screen w-full px-10 py-10 md:px-40 md:flex-col lg:flex-row 2xl:px-60">
        <article>
          <h1 className="text-white text-3xl font-bold order-1 md:text-4xl 2xl:text-5xl">Emissão e Validação de <span className="text-primary">Certificados</span> com Blockchain</h1>
          <p className="text-secondary-text my-6 text-sm order-3 md:text-base">Valide a autenticidade de certificações e emita documentos digitais de forma segura e transparente. Simplifique a emissão e verificação, garantindo integridade, credibilidade e inovação.</p>
          <Link to="/roles" className="text-primary flex items-center gap-2 font-bold text-lg hover:opacity-80">Comece agora <FaArrowRight /></Link>
        </article>
        <aside>
          <img className="w-9/12 mx-auto" src="src/assets/img/img-certification.png" alt="Certification image" />
        </aside>
      </section>
      <Footer />
    </>
  )
}

export default Home