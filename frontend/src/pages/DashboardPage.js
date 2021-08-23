import Media from 'react-media';
import Header from '../components/Header';
import Container from '../components/UI/Container';
import MobileNavigation from '../components/MobileNavigation';
import Currency from '../components/Currency';
import AddTransaction from '../components/Modals/AddTransaction';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
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
              <MobileNavigation />
              {!matches.small ? <Currency /> : undefined}
            </div>
            <div className={styles.btnAdd}>
              <AddTransaction />
            </div>
          </Container>
        </>
      )}
    </Media>
  );
};

export default DashboardPage;
