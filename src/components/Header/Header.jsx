import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import Container from '../UI/Container';
import Logo from '../Logo';
import LogOut from '../Modals/LogOut';
import styles from './Header.module.css';

const Header = () => {
  const name = useSelector(authSelectors.getUsersName);
  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.headerBox}>
          <Logo />
          <div className={styles.exitBox}>
            <p className={styles.name}>{name}</p>
            <LogOut />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
