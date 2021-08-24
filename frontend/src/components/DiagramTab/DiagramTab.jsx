import Chart from '../Chart';
import Tab from '../Tab';
import styles from './DiagramTab.module.css';

const DiagramTab = () => {
  return (
    <>
      <h2 className={styles.head}>Статистика</h2>
      <div className={styles.wrapper}>
        <Chart />
        <Tab />
      </div>
      );
    </>
  );
};

export default DiagramTab;
