import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const LinkButton = ({ to, text }) => {
  return (
    <Link to={to} className="text-primary flex items-center gap-2 font-bold text-lg hover:text-primary-hover transition-all">{text} <FaArrowRight /></Link>
  )
}

export default LinkButton