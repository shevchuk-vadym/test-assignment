import { Card } from '../Card/Card';
import s from './Content.module.scss';
import { Button } from '../Button';

export const Content = ({ users, moreUsers, isShowMoreButtonVisible }) => {
  console.log(users);
  return (
    <div className={s.content}>
      <div className={s.content_header}>
        <h1>Working with GET request</h1>
      </div>
      <div className={s.content_main}>
        <Card users={users} />
      </div>
      {isShowMoreButtonVisible && (
        <div className={s.content_bottom}>
          <Button onClick={moreUsers} text='Show more' />
        </div>
      )}
    </div>
  );
};
