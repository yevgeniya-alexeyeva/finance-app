import { Doughnut } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { diagramColors } from '../../utils';

const Chart = ({ costs = [100] }) => {
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
