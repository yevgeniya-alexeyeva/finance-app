import { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';
import PublicRoute from '../PublicRoute';
import { authOperations } from '../../redux/auth';
import routes from '../../routes';

const RegisterPage = lazy(() =>
  import('../../pages' /* webpackChunkName: "register-page" */),
);
const LogInPage = lazy(() =>
  import('../../pages' /* webpackChunkName: "login-page" */),
);
const HomePage = lazy(() =>
  import('../../pages' /* webpackChunkName: "home-page" */),
);
const DiagramPage = lazy(() =>
  import('../../pages' /* webpackChunkName: "diagram-page" */),
);

const NotFoundPage = lazy(() =>
  import('../../pages' /* webpackChunkName: "notFound-page" */),
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
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

          <ProtectedRoute path={routes.home} redirectTo={routes.login}>
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path={routes.diagram} redirectTo={routes.login}>
            <DiagramPage />
          </ProtectedRoute>

          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
