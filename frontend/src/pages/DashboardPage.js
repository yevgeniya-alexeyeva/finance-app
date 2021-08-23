import Media from 'react-media';
import Header from '../components/Header';
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
          <div className={styles.container}>
            <div className={styles.contentMobile}>
              <Currency />
            </div>
            <div className={styles.btnAdd}>
              <AddTransaction />
            </div>
          </div>
        </>
      )}
    </Media>
  );
};

export default DashboardPage;
