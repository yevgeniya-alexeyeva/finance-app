import Chart from '../Chart';
import Tab from '../Tab';
import styles from './DiagramTab.module.css';

const DiagramTab = () => {
  return (
    <div className={styles.wrapper}>
      <Chart />
      <Tab />
    </div>
  );
};

export default DiagramTab;
