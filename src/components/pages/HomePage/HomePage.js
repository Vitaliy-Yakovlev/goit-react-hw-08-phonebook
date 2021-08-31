import { useSelector } from 'react-redux';
import { getIsLoggedIn, getUserName } from '../../../redux/auth/auth-selectors';
import s from './HomePage.module.css';

export default function HomePages() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const name = useSelector(getUserName);

  return (
    <>
      {!isLoggedIn ? (
        <div className={s.container}>
          <h1 className={s.title}>
            Добро пожаловать в приложения Phonebook!!!
          </h1>
          <p className={s.description}>
            Чтобы начать пользоваться приложением, нужно зарегистрироваться или
            Войти в свой аккаунт!
          </p>
        </div>
      ) : (
        <div className={s.container}>
          <h1 className={s.title}>Добро пожаловать, {name}!!</h1>
          <p className={s.description}>
            Чтобы начать пользоваться приложением нужно перейти на "Контакты"!
          </p>
        </div>
      )}
    </>
  );
}
