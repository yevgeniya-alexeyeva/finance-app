import styles from './Balance.module.css';

const Balance = ({ balance }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>ВАШ БАЛАНС</p>
      <div className={styles.amount}>
        <p className={styles.sign}>&#8372;</p>
        {`${balance}`}
      </div>
    </div>
  );
};

export default Balance;
