import LinkButton from "./LinkButton";

const Card = ({ to, icon, title, description }) => {
  return (
    <div className="border-solid border border-medium-gray rounded-2xl p-6 flex flex-col gap-4 bg-dark-background lg:w-1/3">
      <div className="text-primary text-4xl">
        {icon}
      </div>
      <h3 className="text-white font-bold md:text-xl">{title}</h3>
      <p className="text-sm text-secondary-text mb-auto">{description}</p>
      <LinkButton to={to} text="Continuar"/> 
    </div>
  )
}

export default Card