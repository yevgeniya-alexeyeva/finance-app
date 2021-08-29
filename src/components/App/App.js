import { Suspense, lazy } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import PublicRoute from '../PublicRoute';
import { authOperations } from '../../redux/auth';
import { authSelectors } from '../../redux/auth';
import routes from '../../routes';
import Loader from '../Loader';

const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage' /* webpackChunkName: "register-page" */),
);
const LogInPage = lazy(() =>
  import('../../pages/LogInPage' /* webpackChunkName: "login-page" */),
);
const DashboardPage = lazy(() =>
  import('../../pages/DashboardPage' /* webpackChunkName: "dashboard-page" */),
);

function App() {
  const dispatch = useDispatch();
  console.log('deploy s');

  const token = useSelector(authSelectors.getToken);
  console.log('🚀 ~ file: App.js ~ line 26 ~ App ~ token', token);

  useEffect(() => {
    dispatch(authOperations.getCurrentUser(token));
  }, [dispatch, token]);

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <PublicRoute
          path={routes.register}
          restricted
          redirectTo={routes.login}
        >
          <RegisterPage />
        </PublicRoute>
        <PublicRoute path={routes.login} restricted redirectTo={routes.home}>
          <LogInPage />
        </PublicRoute>
        <ProtectedRoute path={routes.dashboard} redirectTo={routes.login}>
          <DashboardPage />
        </ProtectedRoute>
        <Redirect to={routes.login} />
      </Switch>
    </Suspense>
  );
}

export default App;
