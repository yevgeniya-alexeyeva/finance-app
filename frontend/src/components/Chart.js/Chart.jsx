import { Doughnut } from 'react-chartjs-2';
import styles from './Chart.module.css';

const data = {
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3, 2, 7, 9],
      backgroundColor: [
        'rgba(254, 208, 87)',
        'rgba(255, 216, 208)',
        'rgba(253, 148, 152)',
        'rgba(197, 186, 255)',
        'rgba(110, 120, 232)',
        'rgba(74, 86, 226)',
        'rgba(129, 255, 255)',
        'rgba(36, 204, 167)',
        'rgba(0, 137, 132)',
      ],
      borderWidth: 0,
    },
  ],
};

const Chart = () => {
  return (
    <div className={styles.chartWrapper}>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;
