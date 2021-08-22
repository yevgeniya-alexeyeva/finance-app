import { useState } from 'react';
import { useFormik } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Switch, TextField, Button } from '@material-ui/core';
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
    height: 540,
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
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });
  const [selectedDate, setSelectedDate] = useState(Date.now());

  const f = useFormik({
    initialValues: {
      type: null,
      category: null,
      sum: null,
      date: null,
      comment: null,
    },
    validationSchema: Yup.object({
      sum: Yup.string()
        .matches(/^([0-9])*([.][0-9]{2})?$/, {
          message: 'Invalid value',
        })
        .required('The field is required'),
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

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
                <input id="toggleButton" type="checkbox" />
                <label
                  for="toggleButton"
                  data-on-text="Доход"
                  data-off-text="Расход"
                ></label>
                <div className={styles.switchBtnIcon}></div>
              </div>
            </div>

            {/* <div class="toggle-button toggle-button--aava">
                <input id="toggleButton" type="checkbox"/>
                <label for="toggleButton" data-on-text="On" data-off-text="Off"></label>
                <div class="toggle-button__icon"></div></div> */}
            {/* <Switch
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            /> */}
            <TextField
              //   error={f.errors?.host && f.touched.host ? true : false}
              fullWidth
              id="category"
              name="cstegory"
              //   label={t('locationFormRoute').host}
              select
              value={f.values.category}
              onChange={f.handleChange}
              //   helperText={
              //     f.errors?.host && f.touched.host ? f.errors?.host : ' '
              //   }
              //   className={s.input}
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
            <TextField
              //   error={
              //     f.errors?.cabinets?.S?.price && f.touched.cabinets?.S?.price
              //       ? true
              //       : false
              //   }
              id="sum"
              name="sum"
              value={f.values.sum}
              onChange={f.handleChange}
              //   className={s.input}
              //   helperText={
              //     f.errors?.cabinets?.S?.price && f.touched.cabinets?.S?.price
              //       ? f.errors?.cabinets?.S?.price
              //       : ' '
              //   }
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              //   error={
              //     f.errors?.cabinets?.S?.price && f.touched.cabinets?.S?.price
              //       ? true
              //       : false
              //   }
              id="comment"
              name="comment"
              value={f.values.comment}
              onChange={f.handleChange}
              //   className={s.input}
              //   helperText={
              //     f.errors?.cabinets?.S?.price && f.touched.cabinets?.S?.price
              //       ? f.errors?.cabinets?.S?.price
              //       : ' '
              //   }
            />
            <Button
              variant="outlined"
              fullWidth
              type="button"
              // onClick={goBack}
            >
              {/* {t('locationFormRoute').cancelBtn} */}
            </Button>
            <Button color="primary" variant="contained" fullWidth type="submit">
              {/* {t('locationFormRoute').submitBtn} */}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
