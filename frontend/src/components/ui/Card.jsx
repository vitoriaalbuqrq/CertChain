import { Link } from "react-router-dom";

const Card = ({ icon, title, description }) => {
  return (
    <Link to="/issue" className="border-solid border border-medium-gray rounded-2xl p-6 flex flex-col gap-3 bg-dark-background cursor-pointer hover:bg-secondary-bg lg:w-1/3">
      <div className="text-primary text-4xl">
        {icon}
      </div>
      <h3 className="text-white font-bold md:text-xl">{title}</h3>
      <p className="text-sm text-secondary-text">{description}</p>
    </Link>
  )
}

export default Card