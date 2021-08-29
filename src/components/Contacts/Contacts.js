import React, { useEffect } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import {
  deleteContact,
  fetchContacts,
} from '../../redux/contacts/contacts-operations';
import {
  getVisibleContacts,
  getError,
  getLoading,
} from '../../redux/contacts/contacts-selectors';
import s from './Contacts.module.css';

export default function Contacts() {
  const contacts = useSelector(getVisibleContacts);
  const loader = useSelector(getLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loader) {
    return <Loader type="ThreeDots" color="#51cde6" className={s.loader} />;
  }

  if (error) {
    return <h2 className={s.error}>Что-то пошло не так :(</h2>;
  }

  const onClick = id => dispatch(deleteContact(id));

  return (
    <ul className={s.list}>
      {contacts.map(({ name, id, number }) => {
        return (
          <li className={s.item} key={id}>
            {name}:{' '}
            <a className={s.link} href={`tel:${number}`}>
              {number}
            </a>
            <button className={s.btn} type="button" onClick={() => onClick(id)}>
              <AiTwotoneDelete />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  filter: PropTypes.string,
};
