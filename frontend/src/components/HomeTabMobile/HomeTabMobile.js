import style from './HomeTabMobile.module.css';

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
];
const HomeTabMobile = () => {
  return (
    <ul>
      {rows.map(i => {
        const accent = i.type === '-' ? style.accentRed : style.accentGreen;

        return (
          <li className={style.listItem}>
            <ul className={style.transaktionList}>
              <li className={style.transaktionDescr}>
                <p>Дата</p>
                <p className={style.row}>{i.date}</p>
              </li>
              <li className={style.transaktionDescr}>
                <p>Тип</p>
                <p className={style.row}>{i.type}</p>
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
                <p className={style.row.concat(' ', accent)}>{i.price}</p>
              </li>
              <li className={style.transaktionDescr}>
                <p>Баланс</p>
                <p className={style.row}>{i.balance}</p>
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default HomeTabMobile;
