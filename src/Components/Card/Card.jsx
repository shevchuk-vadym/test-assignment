import React from 'react';
import s from './Card.module.scss';

export const Card = ({ users }) => {
  if (users) {
    return (
      <>
        {users.map((user) => (
          <div className={s.card}>
            <div className={s.card_image}>
              <img src={user.photo} alt='' />
            </div>
            <div className={s.card_name}>
              <span>
                {user.name.length > 20 ? user.name.slice(0, 20) : user.name}
              </span>
            </div>
            <div className={s.card_info}>
              <div className={s.card_info__vocation}>{user.position}</div>
              <div className={s.card_info__mail}>
                {user.email.length > 20 ? user.email.slice(10, 30) : user.email}
              </div>
              <div className={s.card_info__phoneNumber}>{user.phone}</div>
            </div>
          </div>
        ))}
      </>
    );
  }
};
