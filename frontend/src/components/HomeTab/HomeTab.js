import style from './HomeTab.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';

const HomeTab = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    state => state.transactions.transactionList,
    shallowEqual,
  );
  useEffect(() => {
    dispatch(transactionsOperations.fetchTrList());
  }, []);

  // if (!transactions.length) {
  //   return <p className={style.empty}>No such user's collection</p>;
  // }},
  // const transactions = [
  //   {
  //     date: {
  //       year: 2201,
  //       month: 10,
  //       day: 1,
  //     },
  //     comment: 'test',
  //     _id: '6128b31ea8e26d2c309b40ee',
  //     transactionType: 'deposit',
  //     amount: 1500,
  //     balanceAfter: 1500,
  //     owner: '6123fda0d1545337b8367e79',
  //     createdAt: '2021-08-27T09:40:46.133Z',
  //     updatedAt: '2021-08-27T09:40:46.133Z',
  //   },
  //   {
  //     date: {
  //       year: 2201,
  //       month: 10,
  //       day: 1,
  //     },
  //     comment: 'test',
  //     _id: '6128b35aa8e26d2c309b40f3',
  //     transactionType: 'deposit',
  //     amount: 1500,
  //     balanceAfter: 3000,
  //     owner: '6123fda0d1545337b8367e79',
  //     createdAt: '2021-08-27T09:41:46.284Z',
  //     updatedAt: '2021-08-27T09:41:46.284Z',
  //   },
  //   {
  //     date: {
  //       year: 2201,
  //       month: 10,
  //       day: 1,
  //     },
  //     comment: 'test',
  //     _id: '6128b366a8e26d2c309b40f8',
  //     transactionType: 'deposit',
  //     amount: 1500,
  //     balanceAfter: 4500,
  //     owner: '6123fda0d1545337b8367e79',
  //     createdAt: '2021-08-27T09:41:58.821Z',
  //     updatedAt: '2021-08-27T09:41:58.821Z',
  //   },
  //   {
  //     date: {
  //       year: 2201,
  //       month: 10,
  //       day: 1,
  //     },
  //     comment: 'test',
  //     _id: '6128b72d8da4c02b187386a2',
  //     transactionType: 'withdrawal',
  //     amount: 500,
  //     balanceAfter: 4000,
  //     owner: '6123fda0d1545337b8367e79',
  //     createdAt: '2021-08-27T09:58:05.573Z',
  //     updatedAt: '2021-08-27T09:58:05.573Z',
  //   },
  //   {
  //     date: {
  //       year: 2201,
  //       month: 10,
  //       day: 1,
  //     },
  //     comment: 'test',
  //     _id: '6128b7308da4c02b187386a7',
  //     transactionType: 'withdrawal',
  //     amount: 500,
  //     balanceAfter: 3500,
  //     owner: '6123fda0d1545337b8367e79',
  //     createdAt: '2021-08-27T09:58:08.385Z',
  //     updatedAt: '2021-08-27T09:58:08.385Z',
  //   },
  // ];

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
