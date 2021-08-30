import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { getIsLoggedIn } from '../../../redux/auth/auth-selectors';

export default function PublicRouter({
  children,
  redirectTo = '/',
  restricted = false,
  ...routeProps
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
