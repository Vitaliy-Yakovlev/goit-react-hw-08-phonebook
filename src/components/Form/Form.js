import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addContact } from '../../redux/contacts-operations';
import { getError } from '../../redux/contacts-selectors';
import s from './Form.module.css';

export default function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameItems = useSelector(state =>
    state.contacts.items.map(contact => contact.name),
  );

  const error = useSelector(getError);

  const dispatch = useDispatch();

  const onSubmit = ({ name, number }) => dispatch(addContact({ name, number }));

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (nameItems.join('').toLowerCase().includes(name.toLowerCase())) {
      toast.error(`${name} is already in contacts`);
      reset();
      return;
    }

    if (error) {
      return;
    }

    onSubmit({ name, number });

    reset();
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          value={name}
          onChange={handleInputChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <label className={s.label}>
          Number
          <input
            className={s.input}
            value={number}
            onChange={handleInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button className={s.btn} type="submit">
          Add contact
        </button>
      </label>
    </form>
  );
}
