import style from './HomeTab.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';
import { authSelectors } from '../../redux/auth';
import Notification from '../Notification';
import SmallLoader from '../UI/SmallLoader';
import { transactionsSelectors } from '../../redux/transactions';

const HomeTab = () => {
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
      {!loading && !!transactions.length && (
        <div className={style.tab}>
          <div className={style.head}>
            <p>Date</p>
            <p>Type</p>
            <p>Category</p>
            <p>Comment</p>
            <p>Amount</p>
            <p>Balance</p>
          </div>
          <ul className={style.scroll}>
            {transactions.map(i => {
              const date = `${i.date.day}.${i.date.month}.${i.date.year
                .toString()
                .split('')
                .slice(2)
                .join('')}`;
              const category = categories.find(
                item => item.id === i.categoryId,
              );
              const type = i.transactionType === 'deposit' ? '+' : '-';
              const accent = type === '-' ? style.accentRed : style.accentGreen;
              return (
                <li key={i._id} className={style.transactions}>
                  <p className={style.row}>{date}</p>
                  <p className={style.row}>{type}</p>
                  <p className={style.row}>{category?.name || 'Income'}</p>
                  <p className={style.row}>{i.comment}</p>
                  <p className={style.row.concat(' ', accent)}>{i.amount}</p>
                  <p className={style.row}>{i.balance}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!loading && !transactions.length && (
        <p className={style.empty}>
          Your list of income and expenses is empty.
        </p>
      )}
    </>
  );
};

export default HomeTab;
