import React from 'react';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Heading from './components/Heading';
import Container from './components/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Phonebook() {
  return (
    <>
      <Container>
        <Heading text="Phonebook" />
        <Form />
        <ToastContainer autoClose={5000} />
        <Heading text="Contacts" />
        <Filter />
        <Contacts />
      </Container>
    </>
  );
}
