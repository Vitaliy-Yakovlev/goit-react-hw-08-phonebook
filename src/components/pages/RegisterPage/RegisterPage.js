import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import { registerUser } from '../../../redux/auth/auth-operations';
import s from './RegisterPage.module.css';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    dispatch(registerUser({ name, email, password }));
    if (name.length < 0 || email.length < 0 || password.length < 0) {
      setName('');
      setEmail('');
      setPassword('');
    }
    if (name === '') {
      toast.warning('Заполни поля "Имя"');
    }

    if (email === '') {
      toast.warning('Заполни поля "Почта"');
    }

    if (password === '') {
      toast.warning('Заполни поля "Пароль"');
    }
  };

  const patternName =
    "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";

  return (
    <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
      <FormControl>
        <div className={s.tumps}>
          <div className={s.container}>
            <TextField
              inputProps={{ pattern: patternName }}
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              className={s.input}
              label="Name"
              variant="outlined"
              size="small"
              placeholder="Vitaliy Yakovlev"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />

            <FormHelperText className={s.p}>Ведите Имя</FormHelperText>
          </div>

          <div className={s.container}>
            <TextField
              className={s.input}
              label="Email"
              variant="outlined"
              size="small"
              placeholder="@"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
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
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            <FormHelperText>Ведите Пароль</FormHelperText>
          </div>
          <button className={s.btn} type="submit">
            Войти
          </button>
        </div>
      </FormControl>
    </form>
  );
}
