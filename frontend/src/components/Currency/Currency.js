import { useState, useEffect } from 'react';
import Media from 'react-media';
import { getCurrency } from '../../services/privatBank-api';
import styles from './Currency.module.css';

const Currency = () => {
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState();

  const toogleLoading = () => setLoading(isLoading => !isLoading);

  useEffect(() => {
    async function fetchData() {
      toogleLoading();
      const data = await getCurrency();
      setCurrency(data);
      localStorage.setItem(
        'currency',
        JSON.stringify({ course: data, dateGetCurrency: Date.now() }),
      );
      toogleLoading();
      return;
    }

    const currentCurrency = localStorage.currency
      ? JSON.parse(localStorage.currency)
      : null;
    if (
      currentCurrency &&
      Date.now() - currentCurrency.dateGetCurrency < 3600000
    ) {
      return setCurrency(currentCurrency.course);
    } else {
      return fetchData();
    }
  }, []);

  return (
    <Media
      queries={{
        small: { maxWidth: 767 },
        medium: { minWidth: 768, maxWidth: 1279 },
        large: { minWidth: 1280 },
      }}
    >
      {matches => (
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
              {currency &&
                currency
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
          {loading && <span>Loading ...</span>}
        </div>
      )}
    </Media>
  );
};

export default Currency;
