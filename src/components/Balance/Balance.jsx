import styles from './Balance.module.css';
import { authSelectors } from '../../redux/auth';
import { useSelector } from 'react-redux';

const Balance = () => {
  const balance = useSelector(authSelectors.getUserBalance);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>BALANCE</p>
      <div className={styles.amount}>
        <p className={styles.sign}>&#8372;</p>
        {`${balance}`}
      </div>
    </div>
  );
};

export default Balance;
