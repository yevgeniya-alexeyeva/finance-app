import { Link } from 'react-router-dom';
import Media from 'react-media';
import LogoImg from '../../assets/Logo.png';
import routes from '../../routes';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Media queries={{ small: { maxWidth: 767 } }}>
      {matches => (
        <Link to={routes.home} className={styles.logo}>
          <img
            alt="logo"
            src={LogoImg}
            width={matches.small ? '30' : '40'}
            height={matches.small ? '30' : '40'}
          />
          <h1
            className={
              matches.small
                ? `${styles.title} ${styles.titleSmall}`
                : styles.title
            }
          >
            Wallet
          </h1>
        </Link>
      )}
    </Media>
  );
};

export default Logo;
