import { useFormContext } from 'react-hook-form';


export function ErrorMessage({ name }) {
    const { formState: { errors } } = useFormContext();
    const error = errors[name];

    if (!error) {
        return null;
    }

    return (
        <span className="text-red-500 text-sm">{error.message?.toString()}</span>
    );
}