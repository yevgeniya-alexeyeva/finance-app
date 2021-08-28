import style from './HomeTabMobile.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { fetchTrList } from '../../redux/transactions/transactions-operations';

const HomeTabMobile = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    state => state.transactions.transactionList,
    shallowEqual,
  );
  useEffect(() => dispatch(fetchTrList()), {});
  return (
    <ul>
      {transactions.map(i => {
        const date = `${i.date.day}.${i.date.month}.${i.date.year
          .toString()
          .split('')
          .slice(2)
          .join('')}`;
        const type = i.transactionType === 'deposit' ? '+' : '-';
        const accent = type === '-' ? style.accentRed : style.accentGreen;

        return (
          <li className={style.listItem}>
            <ul className={style.transaktionList}>
              <li className={style.transaktionDescr}>
                <p>Дата</p>
                <p className={style.row}>{date}</p>
              </li>
              <li className={style.transaktionDescr}>
                <p>Тип</p>
                <p className={style.row}>{type}</p>
              </li>
              <li className={style.transaktionDescr}>
                <p>Категория</p>
                <p className={style.row}>{i.category}</p>
              </li>
              <li className={style.transaktionDescr}>
                <p>Комментарий</p>
                <p className={style.row}>{i.comment}</p>
              </li>
              <li className={style.transaktionDescr}>
                <p>Сумма</p>
                <p className={style.row.concat(' ', accent)}>{i.amount}</p>
              </li>
              <li className={style.transaktionDescr}>
                <p>Баланс</p>
                <p className={style.row}>{i.balanceAfter}</p>
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default HomeTabMobile;
