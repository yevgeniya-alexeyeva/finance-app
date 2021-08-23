import { defaultCostSheet, diagramColors } from '../../utils';
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
    color: 'black',
  },
}));

const Tab = props => {
  // const { handleChange } = props;
  const data = defaultCostSheet.map((cost, index) => {
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
  const classes = useStyles();

  return (
    <div className={styles.tabWrapper}>
      <div className={styles.selectorsWrapper}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="month">Месяц</InputLabel>
          <Select
            native
            style={{
              borderRadius: 30,
              height: 50,
            }}
            value={1}
            onChange={null}
            label="Month"
            inputProps={{
              name: 'month',
              id: 'month',
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="month">Год</InputLabel>
          <Select
            className={styles.select}
            native
            style={{ borderRadius: 30, height: 50 }}
            value={1}
            onChange={null}
            label="Age"
            inputProps={{
              name: 'month',
              id: 'month',
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
      </div>
      <div className={styles.tableHeader}>
        <span className={styles.headerCategory}>Категория</span>
        <span className={styles.headerAmount}>Сумма</span>
      </div>
      <ul className={styles.costsList}>{data}</ul>
    </div>
  );
};

export default Tab;
