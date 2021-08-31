import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Heading from './components/Heading';
import Container from './components/Container';
import AppBar from './components/AppBar';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import NotFoundPage from './components/pages/NotFoundPage';
import { fetchCurrentUser } from './redux/auth/auth-operations';
import { getIsFetchingCurrent } from './redux/auth/auth-selectors';
import PrivateRouter from './components/Navigations/PrivateRoute';
import PublicRouter from './components/Navigations/PublicRoute';

export default function Phonebook() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(getIsFetchingCurrent);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Container>
        <AppBar />
        {!isFetchingCurrentUser && (
          <Switch>
            <PublicRouter exact path="/">
              <HomePage />
            </PublicRouter>

            <PublicRouter path="/login" redirectTo="/contacts" restricted>
              <LoginPage />
              <ToastContainer position="top-center" autoClose={5000} />
            </PublicRouter>

            <PublicRouter path="/register" restricted>
              <RegisterPage />
              <ToastContainer position="top-center" autoClose={5000} />
            </PublicRouter>

            <PrivateRouter path="/contacts" redirectTo="/login">
              <Heading text="Phonebook" />
              <Form />
              <ToastContainer autoClose={3000} />
              <Heading text="Contacts" />
              <Filter />

              <Contacts />
            </PrivateRouter>

            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        )}
      </Container>
    </>
  );
}
