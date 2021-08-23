import Media from 'react-media';
import Logo from '../Logo';
import LogOut from '../Modals/LogOut';
import styles from './Header.module.css';

const Header = () => {
  return (
    <Media
      queries={{
        small: { maxWidth: 767 },
        medium: { minWidth: 768, maxWidth: 1279 },
        large: { minWidth: 1280 },
      }}
    >
      {matches => (
        <div
          className={
            (matches.small && styles.header) ||
            (matches.medium && `${styles.header} ${styles.headerMedium}`) ||
            (matches.large && `${styles.header} ${styles.headerLarge}`)
          }
        >
          <Logo />
          <div className={styles.exitBox}>
            <p className={styles.name}>Имя</p>
            <LogOut />
          </div>
        </div>
      )}
    </Media>
  );
};

export default Header;
