import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import { logInUser } from '../../../redux/auth/auth-operations';
import s from './LoginPage.module.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logInUser({ email, password }));
    if (email.length < 0 && password.length < 0) {
      setEmail('');
      setPassword('');
    }

    if (email === '') {
      toast.warning(`Заполни поля email`);
    }

    if (password === '') {
      toast.warning(`Заполни поля password`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
      <FormControl>
        <div className={s.tumps}>
          <div className={s.container}>
            <TextField
              className={s.input}
              label="Email"
              variant="outlined"
              size="small"
              placeholder="@"
              value={email}
              onChange={handleChange}
              type="email"
              name="email"
              required
            />

            <FormHelperText>Ведите EMAIL</FormHelperText>
          </div>

          <div className={s.container}>
            <TextField
              className={s.input}
              label="Password"
              variant="outlined"
              size="small"
              placeholder="***"
              value={password}
              onChange={handleChange}
              type="password"
              name="password"
              required
            />
            <FormHelperText>Ведите номер телефона</FormHelperText>
          </div>
          <button className={s.btn} type="submit">
            Войти
          </button>
        </div>
      </FormControl>
    </form>
  );
}
