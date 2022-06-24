import s from './SuccessfullRegister.module.scss';
import image from '../assets/success-image.svg';

export const SuccessfullRegister = () => {
  return (
    <div className={s.content}>
      <div className={s.content_header}>
        <h1>User successfully registered</h1>
      </div>
      <div className={s.content_main}>
        <img src={image} alt='' />
      </div>
    </div>
  );
};
