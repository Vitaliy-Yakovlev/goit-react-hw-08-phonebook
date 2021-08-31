import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import * as contactsActions from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import s from './Filter.module.css';

export default function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChangeFilter = e =>
    dispatch(contactsActions.filterContact(e.target.value));

  return (
    <label className={s.label}>
      <TextField
        className={s.input}
        label="Find contact by name"
        variant="outlined"
        size="small"
        type="text"
        value={value}
        onChange={onChangeFilter}
      />
    </label>
  );
}
