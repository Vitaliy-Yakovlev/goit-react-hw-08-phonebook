import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { authSelectors } from '../../../redux/auth';

export default function PrivateRouter({
  redirectTo = '/',
  children,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
