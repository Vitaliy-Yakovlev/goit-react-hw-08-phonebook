import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors';
import s from './Navigations.module.css';

const Navigations = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <nav>
      <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
        Главная
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={s.link}
          activeClassName={s.activeLink}
        >
          Контакты
        </NavLink>
      )}
    </nav>
  );
};

export default Navigations;
