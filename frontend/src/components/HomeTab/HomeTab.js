import style from './HomeTab.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';
import { authSelectors } from '../../redux/auth';

const HomeTab = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(
    state => state.transactions.transactionList,
    shallowEqual,
  );

  const token = useSelector(authSelectors.getToken);

  useEffect(() => {
    dispatch(transactionsOperations.fetchTrList(token));
  }, [dispatch, token]);

  return (
    <>
      {transactions.length ? (
        <div className={style.tab}>
          <div className={style.head}>
            <p>Дата</p>
            <p>Тип</p>
            <p>Категория</p>
            <p>Комментарий</p>
            <p>Сумма</p>
            <p>Баланс</p>
          </div>
          <div className={style.scroll}>
            {transactions.map(i => {
              const date = `${i.date.day}.${i.date.month}.${i.date.year
                .toString()
                .split('')
                .slice(2)
                .join('')}`;
              const type = i.transactionType === 'deposit' ? '+' : '-';
              const accent = type === '-' ? style.accentRed : style.accentGreen;
              return (
                <div key={i._id} className={style.transactions}>
                  <p className={style.row}>{date}</p>
                  <p className={style.row}>{type}</p>
                  <p className={style.row}>{i.category || 'none'}</p>
                  <p className={style.row}>{i.comment}</p>
                  <p className={style.row.concat(' ', accent)}>{i.amount}</p>
                  <p className={style.row}>{i.balanceAfter}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className={style.empty}>No such user's collection</p>
      )}
    </>
  );
};

export default HomeTab;
