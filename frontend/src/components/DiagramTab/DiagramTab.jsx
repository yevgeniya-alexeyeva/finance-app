import Chart from '../Chart';
import Tab from '../Tab';
import styles from './DiagramTab.module.css';
import { defaultCostSheet } from '../../utils';

const data = defaultCostSheet.map(cost => cost.amount);
const totalCredit = defaultCostSheet
  .reduce((acc, item) => {
    return (acc += item.amount);
  }, 0)
  .toFixed(2);

const totalDebit = 5000;

const DiagramTab = () => {
  return (
    <>
      <h2 className={styles.head}>Статистика</h2>
      <div className={styles.wrapper}>
        <Chart costs={data} />
        <Tab costs={defaultCostSheet} debit={totalDebit} credit={totalCredit} />
      </div>
    </>
  );
};

export default DiagramTab;
