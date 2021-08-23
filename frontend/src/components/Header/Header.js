import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import Exit from './header.svg';
import routes from '../../routes';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to={routes.home} className={styles.logo}>
        <img src={Logo} width="40" height="40" />
        <h1>Wallet</h1>
      </Link>
      <div className={styles.exitBox}>
        <p className={styles.name}>Имя</p>
        <button className={styles.exitBtn}>
          <svg className={styles.exitIcon} width="18" height="18">
            <use href={`${Exit}#icon-exit`}></use>
          </svg>{' '}
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Header;
