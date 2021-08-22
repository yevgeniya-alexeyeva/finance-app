import { defaultCostSheet, diagramColors } from '../../utils';
import styles from './Tab.module.css';

const Tab = () => {
  const data = defaultCostSheet.map((cost, index) => {
    const style = {
      width: '24px',
      height: '24px',
      backgroundColor: `${diagramColors[index]}`,
    };
    return (
      <li key={cost.category} className={styles.costItem}>
        <div style={style}></div>
        <span>{cost.category}</span>
        <span>{cost.amount}</span>
      </li>
    );
  });
  return (
    <div>
      <ul>{data}</ul>
    </div>
  );
};

export default Tab;
