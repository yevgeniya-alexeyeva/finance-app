import { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';
import PublicRoute from '../PublicRoute';
import { authOperations } from '../../redux/auth';
import routes from '../../routes';

const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage' /* webpackChunkName: "register-page" */),
);
const LogInPage = lazy(() =>
  import('../../pages/LogInPage' /* webpackChunkName: "login-page" */),
);

const TestPage = lazy(() =>
  import('../../pages/TestPage' /* webpackChunkName: "test-page" */),
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
console.log(DiagramPage);

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

          <PublicRoute
            path={routes.testPublic}
            restricted
            // redirectTo={routes.login}
          >
            <TestPage />
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
