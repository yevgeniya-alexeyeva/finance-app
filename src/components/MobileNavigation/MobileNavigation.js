import { NavLink } from 'react-router-dom';
import Media from 'react-media';
import routes from '../../routes';
import iconsSvg from '../../assets/mobileNavigation.svg';
import styles from './MobileNavigation.module.css';

const MobileNavigation = () => {
  return (
    <Media
      queries={{
        small: { maxWidth: 767 },
        medium: { minWidth: 768, maxWidth: 1279 },
        large: { minWidth: 1280 },
      }}
    >
      {matches => (
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <NavLink
              to={routes.home}
              activeClassName={styles.btnActive}
              className={styles.btn}
            >
              <svg className={styles.icon} width="38" height="38">
                <use href={`${iconsSvg}#icon-home`}></use>
              </svg>
              {!matches.small && 'Главная'}
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink
              to={routes.diagram}
              activeClassName={styles.btnActive}
              className={styles.btn}
            >
              <svg className={styles.icon} width="38" height="38">
                <use href={`${iconsSvg}#icon-diagram`}></use>
              </svg>
              {!matches.small && 'Статистика'}
            </NavLink>
          </li>
          {matches.small && (
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
          )}
        </ul>
      )}
    </Media>
  );
};

export default MobileNavigation;
