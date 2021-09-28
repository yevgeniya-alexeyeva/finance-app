import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  transactionsOperations,
  transactionsSelectors,
} from '../../../redux/transactions';
import { authSelectors } from '../../../redux/auth';
import Header from '../../Header';
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
    width: '100vw',
    height: '100vh',
    padding: '0px 11px 30px',
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

export default function AddTransactionModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const categories = useSelector(transactionsSelectors.getCategories);
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.getToken);

  const f = useFormik({
    initialValues: {
      transactionType: false,
      comment: '',
      amount: '0.00',
      categoryId: '',
      date: selectedDate,
    },
    validationSchema: Yup.object({
      transactionType: Yup.bool().required(),
      comment: Yup.string().optional(),
      amount: Yup.string()
        .matches(/^[1-9]\d{0,9}(\.\d{1,2})?$/)
        .required(),
      categoryId: Yup.string().nullable(),
      date: Yup.number().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      const time = moment(values.date).format('DD.MM.YYYY').split('.');
      const dateObj = {
        day: Number(time[0]),
        month: Number(time[1]),
        year: Number(time[2]),
      };
      const payload = {
        transactionType: values.transactionType ? 'deposit' : 'withdrawal',
        comment: !!values.comment ? values.comment : null,
        amount: Number(values.amount),
        categoryId: !!values.categoryId ? values.categoryId : null,
        date: dateObj,
      };
      dispatch(transactionsOperations.addTransaction(payload, token));
      setSelectedDate(Date.now());
      resetForm();
      handleClose();
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = date => {
    f.setValues({ ...f.values, date: Date.parse(date) });
    setSelectedDate(date);
  };

  useEffect(() => {
    dispatch(transactionsOperations.fetchCategories(token));
  }, [dispatch, token]);

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
                  Add transaction
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
                            transactionType: e.target.checked,
                            categoryId: e.target.checked
                              ? null
                              : f.values.categoryId,
                          })
                        }
                        checked={f.values.transactionType}
                        value={f.values.transactionType}
                      />
                      <label
                        htmlFor="toggleButton"
                        data-on-text="Income"
                        data-off-text="Expense"
                      ></label>
                      <div className={styles.switchBtnIcon}></div>
                    </div>
                  </div>
                  <div
                    className={matches.small ? styles.contentForm : undefined}
                  >
                    {!f.values.transactionType && categories ? (
                      <TextField
                        error={
                          f.errors.categoryId && f.touched.categoryId
                            ? true
                            : false
                        }
                        fullWidth
                        id="categoryId"
                        name="categoryId"
                        color="secondary"
                        label="Choose category"
                        select
                        value={f.values.categoryId}
                        onChange={f.handleChange}
                        helperText={
                          f.errors?.categoryId && f.touched.categoryId
                            ? f.errors?.categoryId
                            : ' '
                        }
                        className={styles.input}
                      >
                        {categories?.map((c, idx) => (
                          <option
                            key={c.id}
                            value={c.id}
                            className={styles.option}
                          >
                            {c.name}
                          </option>
                        ))}
                      </TextField>
                    ) : undefined}
                    <div className={!matches.small && styles.rowInputs}>
                      <TextField
                        error={
                          f.errors?.amount && f.touched.amount ? true : false
                        }
                        id="amount"
                        name="amount"
                        color="secondary"
                        label="Amount"
                        value={f.values.amount}
                        onChange={f.handleChange}
                        className={styles.input}
                        helperText={
                          f.errors?.amount && f.touched.amount
                            ? f.errors?.amount
                            : ' '
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
                          label="Transaction date"
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
                      label="Comment"
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
                      Add
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
                      Cancel
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
