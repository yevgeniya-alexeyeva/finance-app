import { useEffect } from 'react';
import Media from 'react-media';
import { useDispatch } from 'react-redux';
import { Suspense, lazy } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import routes from '../routes';
import { authOperations } from '../redux/auth';
import Header from '../components/Header';
import Container from '../components/UI/Container';
import MobileNavigation from '../components/MobileNavigation';
import Currency from '../components/Currency';
import AddTransaction from '../components/Modals/AddTransaction';
import styles from './DashboardPage.module.css';
import Loader from '../components/Loader';
import Balance from '../components/Balance';

const HomeAsync = lazy(() =>
  import('../pages/HomePage' /*webpackChunkName: "home-page" */),
);
const DiagramAsync = lazy(() =>
  import('../pages/DiagramPage' /*webpackChunkName: "diagram-page" */),
);

const CurrencyAsync = lazy(() =>
  import('../pages/CurrencyPage' /*webpackChunkName: "currency-page" */),
);

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Media
      queries={{
        small: { maxWidth: 767 },
        medium: { minWidth: 768, maxWidth: 1279 },
        large: { minWidth: 1280 },
      }}
    >
      {matches => (
        <>
          <Header />
          <Container>
            <div className={styles.content}>
              <div className={styles.walletContainer}>
                <div className={styles.walletPanel}>
                  <div>
                    <MobileNavigation />
                    {!matches.small ? <Balance /> : undefined}
                  </div>
                  {!matches.small ? <Currency /> : undefined}
                </div>
              </div>

              {pathname.includes('home') && (
                <div className={styles.btnAdd}>
                  <AddTransaction />
                </div>
              )}
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route exact path={routes.home} component={HomeAsync} />
                  <Route exact path={routes.diagram} component={DiagramAsync} />
                  {matches.small && (
                    <Route
                      exact
                      path={routes.currency}
                      component={CurrencyAsync}
                    />
                  )}
                </Switch>
              </Suspense>
            </div>
          </Container>
        </>
      )}
    </Media>
  );
};

export default DashboardPage;
