import { useFormContext } from 'react-hook-form';

const Input = ({ label, name, type, placeholder, onChange }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label className="text-white text-sm" htmlFor="">{label}</label>
      <input {...register(name)} type={type} placeholder={placeholder} onChange={onChange}
        className="text-white text-sm w-full p-2 rounded-lg bg-secondary-gray border-solid border border-light-gray mt-2 mb-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
    </div>
  )
}

export default Input