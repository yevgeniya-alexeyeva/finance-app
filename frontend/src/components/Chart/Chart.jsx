import { Doughnut } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { diagramColors } from '../../utils';
import { authSelectors } from '../../redux/auth';
import { useSelector } from 'react-redux';

function add(accumulator, a) {
  return accumulator + a;
}

const Chart = ({ costs }) => {
  const balance = useSelector(authSelectors.getUserBalance);

  const costList =
    costs.reduce(add, 0) > 0 ? costs : [1, 1, 1, 1, 1, 1, 1, 1, 1];

  const data = {
    datasets: [
      {
        data: costList,
        backgroundColor: diagramColors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.balance}>&#8372;{` ${balance}`}</div>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;
