import style from './HomeTabMobile.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';
import { authSelectors } from '../../redux/auth';
import Notification from '../Notification';
import { transactionsSelectors } from '../../redux/transactions';
import SmallLoader from '../UI/SmallLoader';

const HomeTabMobile = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(
    transactionsSelectors.getTransactions,
    shallowEqual,
  );

  const categories = useSelector(
    transactionsSelectors.getCategories,
    shallowEqual,
  );

  const loading = useSelector(transactionsSelectors.getIsLoading);

  const token = useSelector(authSelectors.getToken);

  useEffect(() => {
    dispatch(transactionsOperations.fetchTrList(token));
  }, [dispatch, token]);

  return (
    <>
      {!token && (
        <Notification
          type={'error'}
          message={'User is not authenticated'}
          title={'Error'}
        />
      )}
      {loading && <SmallLoader />}
      {!loading && transactions.length ? (
        <ul>
          {transactions.map(i => {
            const date = `${i.date.day}.${i.date.month}.${i.date.year
              .toString()
              .split('')
              .slice(2)
              .join('')}`;
            const type = i.transactionType === 'deposit' ? '+' : '-';
            const accent = type === '-' ? style.accentRed : style.accentGreen;
            const category = categories.find(item => item.id === i.categoryId);
            return (
              <li key={i._id} className={style.listItem.concat(' ', accent)}>
                <ul className={style.transactionList}>
                  <li className={style.transactionDescr}>
                    <p>Date</p>
                    <p className={style.row}>{date}</p>
                  </li>
                  <li className={style.transactionDescr}>
                    <p>Type</p>
                    <p className={style.row}>{type}</p>
                  </li>
                  <li className={style.transactionDescr}>
                    <p>Category</p>
                    <p className={style.row}>{category?.name || 'Income'}</p>
                  </li>
                  <li className={style.transactionDescr}>
                    <p>Comment</p>
                    <p className={style.row}>{i.comment}</p>
                  </li>
                  <li className={style.transactionDescr}>
                    <p>Amount</p>
                    <p className={style.row.concat(' ', style.amount)}>
                      {i.amount}
                    </p>
                  </li>
                  <li className={style.transactionDescr}>
                    <p>Balance</p>
                    <p className={style.row}>{i.balance}</p>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={style.empty}>Your list of income and expenses is empty</p>
      )}
    </>
  );
};

export default HomeTabMobile;
