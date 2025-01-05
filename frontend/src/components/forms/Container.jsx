const Container = (props) => {
  return (
    <div className="bg-secondary-bg rounded-xl p-6 w-full md:w-2/3 md:p-10 lg:w-1/2">
      {props.children}
    </div>
  )
}

export default Container