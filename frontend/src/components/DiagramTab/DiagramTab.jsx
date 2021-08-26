import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredTransactions } from '../../redux/transactions/transactions-selectors';
import { getFilteredTrList } from '../../redux/transactions/transactions-operations';
import Chart from '../Chart';
import Tab from '../Tab';
import styles from './DiagramTab.module.css';
// import { defaultCostSheet } from '../../utils';

const DiagramTab = () => {
  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();

  const [data, setData] = useState({ month: currentMonth, year: currentYear });

  const dispatch = useDispatch();

  const setFilter = e =>
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  // const isLoading = useSelector(getIsLoading);
  const { filteredCosts, income, totalCost } = useSelector(
    getFilteredTransactions,
  );

  const costList = filteredCosts.map(item => item.amount);

  useEffect(() => {
    dispatch(getFilteredTrList(data));
  });

  return (
    <>
      <h2 className={styles.head}>Статистика</h2>
      <div className={styles.wrapper}>
        <Chart costs={costList} />
        <Tab
          costs={filteredCosts}
          debit={income}
          credit={totalCost}
          onChange={setFilter}
        />
      </div>
    </>
  );
};

export default DiagramTab;
