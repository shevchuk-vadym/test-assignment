import s from './Button.module.scss';

export const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={s.button}>
      {text}
    </button>
  );
};
