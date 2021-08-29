import React from 'react';
import { useSelector } from 'react-redux';
import Navigations from '../Navigations';
import UserMenu from '../UserMenu';
import AuthNavigation from '../Navigations/AuthNavigation';
import { authSelectors } from '../../redux/auth';

import s from './AppBar.module.css';

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <header className={s.header}>
      <Navigations />
      {isLoggedIn ? <UserMenu /> : <AuthNavigation />}
    </header>
  );
}
