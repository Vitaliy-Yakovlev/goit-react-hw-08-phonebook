import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Heading from './components/Heading';
import Container from './components/Container';
import AppBar from './components/AppBar';
import { fetchCurrentUser } from './redux/auth/auth-operations';
import { getIsFetchingCurrent } from './redux/auth/auth-selectors';
import PrivateRouter from './components/Navigations/PrivateRoute';
import PublicRouter from './components/Navigations/PublicRoute';

const HomePage = lazy(() =>
  import('./components/pages/HomePage' /*webpackChunkName: "home-page" */),
);
const LoginPage = lazy(() =>
  import('./components/pages/LoginPage' /*webpackChunkName: "login-page" */),
);
const RegisterPage = lazy(() =>
  import(
    './components/pages/RegisterPage' /*webpackChunkName: "register-page" */
  ),
);
const NotFoundPage = lazy(() =>
  import(
    './components/pages/NotFoundPage' /*webpackChunkName: "not-found-page" */
  ),
);

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
          <Suspense
            fallback={
              <Loader type="ThreeDots" color="#51cde6" className="loaderApp" />
            }
          >
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
          </Suspense>
        )}
      </Container>
    </>
  );
}
