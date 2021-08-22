import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import routes from '../../routes';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to={routes.home} className={styles.logo}>
        <img src={Logo} width="40" height="40" />
        <h1>Wallet</h1>
      </Link>
      <div>
        <p>Имя</p>
        <button>Выйти</button>
      </div>
    </div>
  );
};

export default Header;
