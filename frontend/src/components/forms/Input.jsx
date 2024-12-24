import { useFormContext } from 'react-hook-form';

const Input = ({ label, name, type, placeholder }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor="">{label}</label>
      <input {...register(name)} type={type} placeholder={placeholder}
        className="w-full p-2 rounded-lg bg-secondary-gray border-solid border border-light-gray mt-2 mb-1 focus:border-primary focus:ring-2 focus:ring-primary outline-none" />
    </div>
  )
}

export default Input