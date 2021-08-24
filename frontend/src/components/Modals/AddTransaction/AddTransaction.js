import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import Media from 'react-media';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Header from '../../Header';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import styles from './AddTransaction.module.css';

const categories = [
  { _id: '6123b46f7b92ce7fa2ca7442', name: 'Разное' },
  { _id: '6123b46f7b92ce7fa2ca7443', name: 'Продукты' },
  { _id: '6123b46f7b92ce7fa2ca7444', name: 'Машина' },
];

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
    width: '100vw',
    height: '100vh',
    padding: '0px 11px 30px',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  paperMedium: {
    position: 'absolute',
    width: 540,
    height: 'auto',
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
      type: false,
      category: null,
      sum: '0.00',
      date: null,
      comment: null,
    },

    validationSchema: Yup.object({
      type: Yup.bool().required(),
      category: Yup.string().nullable(),
      sum: Yup.string()
        .matches(/^\d{1,9}(\.\d{1,2})?$/)
        .required(),
      date: Yup.object().required(),
      comment: Yup.string(),
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log('val', values);
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = date => {
    const time = moment(date).format('DD.MM.YYYY').split('.');
    f.setValues({
      ...f.values,
      date: { day: time[0], month: time[1], year: time[2] },
    });
    setSelectedDate(date);
  };

  useEffect(async () => {
    await handleDateChange(selectedDate);
  }, [selectedDate]);

  return (
    <Media
      queries={{
        small: { maxWidth: 767 },
        medium: { minWidth: 768, maxWidth: 1279 },
        large: { minWidth: 1280 },
      }}
    >
      {matches => (
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
            <div
              style={modalStyle}
              className={
                matches.small
                  ? classes.paper
                  : `${classes.paper} ${classes.paperMedium}`
              }
            >
              {matches.small ? <Header /> : undefined}
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
                <form onSubmit={f.handleSubmit}>
                  <div className={styles.switchBox}>
                    <div
                      className={`${styles.switchBtn} ${styles.switchBtnAava}`}
                    >
                      <input
                        id="toggleButton"
                        type="checkbox"
                        onChange={e =>
                          f.setValues({
                            ...f.values,
                            type: e.target.checked,
                            category: e.target.checked
                              ? null
                              : f.values.category,
                          })
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
                  <div
                    className={matches.small ? styles.contentForm : undefined}
                  >
                    {!f.values.type ? (
                      <TextField
                        error={
                          f.errors.category && f.touched.category ? true : false
                        }
                        fullWidth
                        id="category"
                        name="category"
                        color="secondary"
                        label="Выберите категорию"
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
                        {categories?.map((c, idx) => (
                          <option
                            key={c._id}
                            value={c._id}
                            className={styles.option}
                          >
                            {c.name}
                          </option>
                        ))}
                      </TextField>
                    ) : undefined}
                    <div className={!matches.small && styles.rowInputs}>
                      <TextField
                        error={f.errors?.sum && f.touched.sum ? true : false}
                        id="sum"
                        name="sum"
                        color="secondary"
                        label="Сумма"
                        value={f.values.sum}
                        onChange={f.handleChange}
                        className={styles.input}
                        helperText={
                          f.errors?.sum && f.touched.sum ? f.errors?.sum : ' '
                        }
                      />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          error={
                            f.errors?.date && f.touched.date ? true : false
                          }
                          disableToolbar
                          variant="inline"
                          format="dd.MM.yyyy"
                          margin="normal"
                          name="date"
                          className={styles.input}
                          color="secondary"
                          id="date-picker-inline"
                          label="Дата транзакции"
                          value={selectedDate}
                          onChange={handleDateChange}
                          helperText={
                            f.errors?.date && f.touched.date
                              ? f.errors?.date
                              : ' '
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <TextField
                      error={
                        f.errors?.comment && f.touched.comment ? true : false
                      }
                      id="comment"
                      name="comment"
                      color="secondary"
                      label="Комментарий"
                      value={f.values.comment}
                      onChange={f.handleChange}
                      className={styles.comment}
                      helperText={
                        f.errors?.comment && f.touched.comment
                          ? f.errors?.comment
                          : ' '
                      }
                    />
                  </div>
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
                      style={{
                        width: 300,
                        borderRadius: 20,
                        padding: '13px 68px',
                      }}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </Media>
  );
}
