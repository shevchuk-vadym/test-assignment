import s from './Button.module.scss';

export const Link = ({ href, text }) => {
  return (
    <a className={s.button} href={href}>
      {text}
    </a>
  );
};
