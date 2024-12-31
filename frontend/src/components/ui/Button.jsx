const Button = ({ text }) => {
  return (
    <button
      className="bg-primary rounded-full p-3 font-bold mt-4 text-white hover:opacity-90"
      type="submit"
    >
      {text}
    </button>
  )
}

export default Button