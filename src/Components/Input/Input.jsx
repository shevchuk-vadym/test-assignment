import s from './Input.module.scss';

export const Input = ({ onChange, value, placeholder }) => {
  return (
    <div className={s.input}>
      <input
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
