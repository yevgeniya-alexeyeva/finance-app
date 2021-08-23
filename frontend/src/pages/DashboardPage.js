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
          <div
            className={
              (matches.small && styles.container) ||
              (matches.medium &&
                `${styles.container} ${styles.containerMedium}`) ||
              (matches.large && `${styles.container} ${styles.containerLarge}`)
            }
          >
            <div className={matches.small && styles.contentMobile}>
              <Currency />
            </div>
            <div
              className={
                (matches.small && styles.btnAdd) ||
                (matches.medium && `${styles.btnAdd} ${styles.btnAddMedium}`) ||
                (matches.large && `${styles.btnAdd} ${styles.btnAddLarge}`)
              }
            >
              <AddTransaction />
            </div>
          </div>
        </>
      )}
    </Media>
  );
};

export default DashboardPage;
