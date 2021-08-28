import { Doughnut } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { diagramColors } from '../../utils';
import { authSelectors } from '../../redux/auth';
import { useSelector } from 'react-redux';

const Chart = ({ costs = [100] }) => {
  const balance = useSelector(authSelectors.getUserBalance);

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
      <div className={styles.balance}>{`${balance}`}</div>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;
