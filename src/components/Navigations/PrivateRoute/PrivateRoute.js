import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { getIsLoggedIn } from '../../../redux/auth/auth-selectors';

export default function PrivateRouter({
  redirectTo = '/',
  children,
  ...routeProps
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
