import s from './Input.module.scss';

export const Input = ({
  onChange,
  type,
  value,
  placeholder,
  errorMessage,
  helpText,
}) => {
  return (
    <div className={`${s.input} ${errorMessage && s.disabled}`}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errorMessage ? (
        <span className={s.input_error}>{errorMessage}</span>
      ) : (
        <span className={s.input_helpText}>{helpText}</span>
      )}
    </div>
  );
};
