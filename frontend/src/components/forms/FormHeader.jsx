const FormHeader = ({title, info}) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-secondary-text w-full md:w-1/2 lg:w-5/12 text-center mt-3 mb-10">{info}</p>
    </>
  )
}

export default FormHeader