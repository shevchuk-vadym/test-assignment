import React from 'react';
import { Button } from '../Button/Button';

import s from './Header.module.scss';
import logo from '../assets/logo.svg';

export const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.header_logo}>
        <img src={logo} alt='logo' />
        <span>TESTTASK</span>
      </div>
      <div className={s.header_user}>
        <Button text='Users' />
        <Button text='Sign up' />
      </div>
    </div>
  );
};
