import { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import PublicRoute from '../PublicRoute';
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
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage' /* webpackChunkName: "notFound-page" */),
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <PublicRoute path={routes.register} restricted redirectTo={routes.home}>
          <RegisterPage />
        </PublicRoute>

        <PublicRoute path={routes.login} restricted redirectTo={routes.home}>
          <LogInPage />
        </PublicRoute>

        <ProtectedRoute path={routes.dashboard} redirectTo={routes.login}>
          <DashboardPage />
        </ProtectedRoute>

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}

export default App;
