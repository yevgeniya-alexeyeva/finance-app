import style from './HomeTab.module.css';

const rows = [
  {
    date: '04.01.19',
    type: '-',
    category: 'Разное',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '-',
    category: 'Разное',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '+',
    category: 'Нерегулярный доход +++',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '+',
    category: 'Разное',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '+',
    category: 'Нерегулярный доход +++',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '+',
    category: 'Разное',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '-',
    category: 'Нерегулярный доход +++',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '+',
    category: 'Разное',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '-',
    category: 'Нерегулярный доход +++',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '+',
    category: 'Разное',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '-',
    category: 'Нерегулярный доход +++',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
  {
    date: '04.01.19',
    type: '-',
    category: 'Разное',
    comment: 'Подарок жене',
    price: '221 300.00',
    balance: '6900.00',
  },
];

const HomeTab = () => {
  return (
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
        {rows.map(i => {
          const accent = i.type === '-' ? style.accentRed : style.accentGreen;
          return (
            <div className={style.rows}>
              <p className={style.row}>{i.date}</p>
              <p className={style.row}>{i.type}</p>
              <p className={style.row}>{i.category}</p>
              <p className={style.row}>{i.comment}</p>
              <p className={style.row.concat(' ', accent)}>{i.price}</p>
              <p className={style.row}>{i.balance}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeTab;
