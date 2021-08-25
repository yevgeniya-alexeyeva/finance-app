import style from './HomeTab.module.css';

function createData(date, type, category, comment, price, balance) {
  return { date, type, category, comment, price, balance };
}

const rows = [
  createData('04.01.19', '-', 'Разное', 'Подарок жене', 300.0, 6900.0),
  createData('04.01.19', '-', 'Разное', 'Подарок жене', 300.0, 6900.0),
  createData('04.01.19', '+', 'Разное', 'Подарок жене', 300.0, 6900.0),
  createData('04.01.19', '-', 'Разное', 'Подарок жене', 300.0, 6900.0),
  createData('04.01.19', '-', 'Разное', 'Подарок жене', 300.0, 6900.0),
  createData('04.01.19', '+', 'Нерегулярный ', 'Подарок жене', 300.0, 6900.0),
];

const HomeTab = () => {
  return (
    <table className={style.tab}>
      <tbody>
        <tr className={style.head}>
          <th>Дата</th>
          <th>Тип</th>
          <th>Категория</th>
          <th>Комментарий</th>
          <th>Сумма</th>
          <th>Баланс</th>
        </tr>
        {rows.map(i => {
          const accent = i.type === '-' ? style.accentRed : style.accentGreen;
          return (
            <tr className={style.rows}>
              <td className={style.row}>{i.date}</td>
              <td className={style.row}>{i.type}</td>
              <td className={style.row}>{i.category}</td>
              <td className={style.row}>{i.comment}</td>
              <td className={style.row.concat(' ', accent)}>{i.price}</td>
              <td className={style.row}>{i.balance}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default HomeTab;
