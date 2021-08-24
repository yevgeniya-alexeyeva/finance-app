import { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';
import PublicRoute from '../PublicRoute';
import { authOperations } from '../../redux/auth';
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

const HomePage = lazy(() =>
  import('../../pages/HomePage' /* webpackChunkName: "home-page" */),
);

const DiagramPage = lazy(() =>
  import('../../pages/DiagramPage' /* webpackChunkName: "diagram-page" */),
);

const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage' /* webpackChunkName: "notFound-page" */),
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <PublicRoute
          path={routes.register}
          restricted
          // redirectTo={routes.login}
        >
          <RegisterPage />
        </PublicRoute>

        <PublicRoute
          path={routes.login}
          restricted
          // redirectTo={routes.login}
        >
          <LogInPage />
        </PublicRoute>

        <PublicRoute
          path={routes.dashboard}
          restricted
          // redirectTo={routes.login}
        >
          <DashboardPage />
        </PublicRoute>

        <ProtectedRoute path={routes.home} redirectTo={routes.login}>
          <HomePage />
        </ProtectedRoute>

        <ProtectedRoute path={routes.diagram} redirectTo={routes.login}>
          <DiagramPage />
        </ProtectedRoute>

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}

export default App;
