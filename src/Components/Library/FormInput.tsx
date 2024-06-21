interface Errors {
  email?: string;
  password?: string;
  repeatEmail?: string;
}

interface Props {
  className: string;
  type: string;
  name: string;
  text: string;
  value?: string;
  errors?: Errors;
}

const FormInput = ({ className, type, name, text, errors, value }: Props) => {
  return (
    <>
      <div className={className}>
        <label htmlFor={name}> {text}</label>
        <input
          type={type}
          name={name}
          id={name}
          value={value && value}
          readOnly={value ? true : false}
        />
        <p>{errors && errors[name]}</p>
      </div>
    </>
  );
};

export default FormInput;
