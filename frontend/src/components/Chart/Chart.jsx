import { Doughnut } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { diagramColors } from '../../utils';
import { defaultCostSheet } from '../../utils';

const Chart = () => {
  const costs = defaultCostSheet.map(cost => cost.amount);
  const data = {
    datasets: [
      {
        data: costs,
        backgroundColor: diagramColors,
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className={styles.chartWrapper}>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;
