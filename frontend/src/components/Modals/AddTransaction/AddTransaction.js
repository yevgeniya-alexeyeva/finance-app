import { useState } from 'react';
import { useFormik } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import styles from './AddTransaction.module.css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 540,
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '40px 66px',
  },
}));

export default function AddTransaction() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now());

  const f = useFormik({
    initialValues: {
      type: true,
      category: null,
      sum: 0,
      date: null,
      comment: null,
    },
    validationSchema: Yup.object({
      sum: Yup.string()
        .matches(/^([0-9])*([.][0-9]{2})?$/, {
          message: 'Невалидное значение',
        })
        .required('Обязательное поле'),
      //  holderName: Yup.string()
      //    .min(1, 'Minimum 1 character')
      //    .required('Required field'),
      //  phoneNumber: Yup.string()
      //    .min(12, t('validationForm').phoneMin)
      //    .max(13, t('validationForm').phoneMax)
      //    .required('Required field')
      //    .matches(/^\+\d*$/, {
      //      message: t('validationForm').phoneValidation,
      //    }),
    }),
    onSubmit: async (values, { resetForm }) => {
      //  try {
      //    const { data } = await postShareKey(values);
      //    await onClose();
      //    await onSubmit(data);
      //    resetForm({});
      //  } catch (error) {
      //    onClose();
      //    showErrorMessage(error.response.data.message);
      //  }
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <button className={styles.addBtn} type="button" onClick={handleOpen}>
        <AddIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-transaction-title"
        aria-describedby="add-transaction-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={styles.modalWindow}>
            <button
              className={styles.closeBtn}
              type="button"
              onClick={handleClose}
            >
              <CloseIcon />
            </button>

            <h2 id="add-transaction-title" className={styles.title}>
              Добавить транзакцию
            </h2>
            <div className={styles.switchBox}>
              <div className={`${styles.switchBtn} ${styles.switchBtnAava}`}>
                <input
                  id="toggleButton"
                  type="checkbox"
                  onChange={e =>
                    f.setValues({ ...f.values, type: e.target.checked })
                  }
                  checked={f.values.type}
                  value={f.values.type}
                />
                <label
                  htmlFor="toggleButton"
                  data-on-text="Доход"
                  data-off-text="Расход"
                ></label>
                <div className={styles.switchBtnIcon}></div>
              </div>
            </div>
            {!f.values.type && (
              <TextField
                error={f.errors.category && f.touched.category ? true : false}
                fullWidth
                id="category"
                name="category"
                color="secondary"
                label="Категория расходов"
                select
                value={f.values.category}
                onChange={f.handleChange}
                helperText={
                  f.errors?.category && f.touched.category
                    ? f.errors?.category
                    : ' '
                }
                className={styles.input}
              >
                {/* {hostsList?.map(hostEl => (
                <option
                  key={hostEl._id}
                  value={hostEl.name}
                  className={s.option}
                >
                  {hostEl.name}
                </option>
              ))} */}
              </TextField>
            )}
            <div className={styles.rowInputs}>
              <TextField
                error={f.errors?.sum && f.touched.sum ? true : false}
                id="sum"
                name="sum"
                color="secondary"
                label="Сумма транзакции"
                value={f.values.sum.toFixed(2)}
                onChange={f.handleChange}
                className={styles.input}
                helperText={
                  f.errors?.sum && f.touched.sum ? f.errors?.sum : ' '
                }
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  error={f.errors?.date && f.touched.date ? true : false}
                  disableToolbar
                  variant="inline"
                  format="dd.MM.yyyy"
                  margin="normal"
                  name="date"
                  color="secondary"
                  id="date-picker-inline"
                  label="Дата транзакции"
                  value={selectedDate}
                  onChange={handleDateChange}
                  helperText={
                    f.errors?.date && f.touched.date ? f.errors?.date : ' '
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <TextField
              error={f.errors?.comment && f.touched.comment ? true : false}
              id="comment"
              name="comment"
              color="secondary"
              label="Комментарий"
              value={f.values.comment}
              onChange={f.handleChange}
              className={styles.comment}
              helperText={
                f.errors?.comment && f.touched.comment ? f.errors?.comment : ' '
              }
            />
            <div className={styles.btns}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  marginBottom: 20,
                  width: 300,
                  borderRadius: 20,
                  padding: '13px 68px',
                }}
              >
                Добавить
              </Button>
              <Button
                onClick={handleClose}
                type="button"
                variant="outlined"
                color="secondary"
                style={{ width: 300, borderRadius: 20, padding: '13px 68px' }}
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
