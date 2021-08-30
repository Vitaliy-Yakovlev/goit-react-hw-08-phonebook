import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/auth/auth-operations';
import { getUserName } from '../../redux/auth/auth-selectors';
import defaultAvatar from './avatar.png';
import s from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(getUserName);
  const avatar = defaultAvatar;

  return (
    <div className={s.container}>
      <img src={avatar} alt="" width="32" className={s.avatar} />
      <span className={s.name}>Добро пожаловать, {name}</span>
      <button type="button" onClick={() => dispatch(logOutUser())}>
        Выйти
      </button>
    </div>
  );
}
