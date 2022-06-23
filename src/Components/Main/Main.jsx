import { Button } from '../Button/Button';
import s from './Main.module.scss';

export const Main = ({ getToken }) => {
  return (
    <div className={s.main}>
      <div className={s.main_content}>
        <div className={s.main_content__header}>
          <h1>
            Test assignment for <br /> front-end developer
          </h1>
        </div>
        <div className={s.main_content__paragraph}>
          <span>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </span>
        </div>
        <div
          className={s.main_content__button}
          onClick={() => {
            getToken();
          }}
        >
          <Button text='Sign Up' />
        </div>
      </div>
    </div>
  );
};
