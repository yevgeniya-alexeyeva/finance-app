import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currencyOperations, currencySelectors } from '../../redux/currency';
import styles from './Currency.module.css';

const Currency = () => {
  const isLoadingCurrency = useSelector(currencySelectors.getLoading);
  const currency = useSelector(currencySelectors.getCurrency);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currencyOperations.fetchCurrency());
  }, [dispatch]);

  return (
    <>
      <div className={styles.boxTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Покупка</th>
              <th>Продажа</th>
            </tr>
          </thead>
          <tbody>
            {currency
              .filter(c => c.ccy !== 'BTC')
              .map(c => (
                <tr key={c.buy}>
                  <td>{c.ccy}</td>
                  <td>{Number(c.buy).toFixed(2)}</td>
                  <td>{Number(c.sale).toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {isLoadingCurrency && <span>Loading ...</span>}
      </div>
    </>
  );
};

export default Currency;
