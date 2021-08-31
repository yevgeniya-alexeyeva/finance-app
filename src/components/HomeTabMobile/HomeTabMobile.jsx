import style from './HomeTabMobile.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';
import { authSelectors } from '../../redux/auth';
import Notification from '../Notification';

const HomeTabMobile = () => {
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
      {!token && (
        <Notification
          type={'error'}
          message={'Пользователь не аутентифицирован'}
          title={'Ошибка'}
        />
      )}
      {transactions.length ? (
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
              <li key={i._id} className={style.listItem.concat(' ', accent)}>
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
                    <p className={style.row.concat(' ', style.amount)}>
                      {i.amount}
                    </p>
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
      ) : (
        <p className={style.empty}>No such user's collection</p>
      )}
    </>
  );
};

export default HomeTabMobile;
