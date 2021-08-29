import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './AuthNavigation.module.css';

export default function AuthNavigation() {
  return (
    <div>
      <NavLink
        to="/register"
        exact
        className={s.link}
        activeClassName={s.activeLink}
      >
        Регистрация
      </NavLink>
      <NavLink
        to="/login"
        exact
        className={s.link}
        activeClassName={s.activeLink}
      >
        Логин
      </NavLink>
    </div>
  );
}
