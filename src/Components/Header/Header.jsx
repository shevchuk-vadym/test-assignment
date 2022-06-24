import React from 'react';
import { Link } from '../Button';

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
        <Link href='#content' text='Users' />
        <Link href='#sendForm' text='Sign up' />
      </div>
    </div>
  );
};
