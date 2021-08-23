import { Suspense, lazy } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import routes from '../../routes';
import PublicRoute from '../PublicRoute';
import ProtectedRoute from '../ProtectedRoute';
import iconsSvg from '../../assets/mobileNavigation.svg';
import styles from './MobileNavigation.module.css';

const HomeAsync = lazy(() =>
  import('../../pages/HomePage' /*webpackChunkName: home-page*/),
);
const DiagramAsync = lazy(() =>
  import('../../pages/DiagramPage' /*webpackChunkName: diagram-page*/),
);

const CurrencyAsync = lazy(() =>
  import('../../pages/CurrencyPage' /*webpackChunkName: currency-page*/),
);

const MobileNavigation = () => {
  return (
    <>
      <ul className={styles.list}>
        <li>
          <NavLink
            to={routes.home}
            activeClassName={styles.btnActive}
            className={styles.btn}
          >
            <svg className={styles.icon} width="38" height="38">
              <use href={`${iconsSvg}#icon-home`}></use>
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.diagram}
            activeClassName={styles.btnActive}
            className={styles.btn}
          >
            <svg className={styles.icon} width="38" height="38">
              <use href={`${iconsSvg}#icon-diagram`}></use>
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.currency}
            activeClassName={styles.btnActive}
            className={styles.btn}
          >
            <svg className={styles.icon} width="38" height="38">
              <use href={`${iconsSvg}#icon-currency`}></use>
            </svg>
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <PublicRoute path={routes.home} redirectTo={routes.login}>
            <HomeAsync />
          </PublicRoute>
          <PublicRoute path={routes.diagram} redirectTo={routes.login}>
            <DiagramAsync />
          </PublicRoute>
          <PublicRoute component={CurrencyAsync} path={routes.currency} exact />
        </Switch>
      </Suspense>
    </>
  );
};

export default MobileNavigation;
