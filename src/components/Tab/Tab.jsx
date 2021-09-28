import { diagramColors } from '../../utils';
import styles from './Tab.module.css';
import { Select, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    display: 'flex',
    margin: '20px 0',
    minWidth: 166,
    maxWidth: 280,
  },
  select: {
    marginTop: theme.spacing(2),
  },
  root: {
    muiFormLabel: { color: 'black' },
  },
}));

const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear - 5; i <= currentYear + 5; i++) {
  years.push(i);
}

const Tab = props => {
  const { onChange, costs, debit, credit } = props;

  const data = costs.map((cost, index) => {
    const style = {
      backgroundColor: `${diagramColors[index]}`,
    };

    return (
      <li key={cost.category} className={styles.costItem}>
        <div className={styles.marker} style={style}></div>
        <span className={styles.costCategory}>{cost.category}</span>
        <span className={styles.costAmount}>{cost.amount}</span>
      </li>
    );
  });
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthOptions = months.map((i, index) => (
    <option key={i} value={index + 1}>
      {i}
    </option>
  ));

  const yearOptions = years.map(i => (
    <option key={i} value={i}>
      {i}
    </option>
  ));

  const classes = useStyles();

  return (
    <div className={styles.tabWrapper}>
      <div className={styles.selectorsWrapper}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            style={{ color: 'black', fontFamily: 'Circe', fontSize: '16px' }}
            htmlFor="month"
          >
            Month
          </InputLabel>
          <Select
            native
            style={{
              borderRadius: 30,
              height: 50,
            }}
            onChange={onChange}
            label="Month"
            inputProps={{
              name: 'month',
              id: 'month',
            }}
          >
            <option aria-label="None" value="" />
            {monthOptions}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            style={{ color: 'black', fontFamily: 'Circe', fontSize: '16px' }}
            htmlFor="month"
          >
            Year
          </InputLabel>
          <Select
            className={styles.select}
            native
            style={{ borderRadius: 30, height: 50 }}
            onChange={onChange}
            label="Year"
            inputProps={{
              name: 'year',
              id: 'year',
            }}
          >
            <option aria-label="None" value="" />
            {yearOptions}
          </Select>
        </FormControl>
      </div>
      <div className={styles.tableHeader}>
        <span className={styles.headerCategory}>Category</span>
        <span className={styles.headerAmount}>Amount</span>
      </div>
      <ul className={styles.costsList}>{data}</ul>
      <ul className={styles.total}>
        <li className={styles.totalItem}>
          <span>Expenses:</span>
          <span className={styles.totalCredits}>{credit}</span>
        </li>
        <li className={styles.totalItem}>
          <span>Incomes:</span>
          <span className={styles.totalDebits}>{debit}</span>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
