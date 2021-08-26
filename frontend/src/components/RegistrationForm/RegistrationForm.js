import routes from '../../routes';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as register from '../../redux/auth/auth-operations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';
import logo from './icons/logo.png';
import Media from 'react-media';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  registerBtn: {
    maxWidth: 280,
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: '#24CCA7',
    color: '#fff',
    marginBottom: 20,
  },
  registerBtnMedium: {
    maxWidth: 300,
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: '#24CCA7',
    color: '#fff',
    marginBottom: 20,
  },
  width: {
    maxWidth: 280,
    width: '100%',
    marginBottom: 40,
  },
  widthInput: {
    maxWidth: 410,
    width: '100%',
    marginBottom: 40,
  },
  signInBtn: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    color: '#24CCA7',
    marginBottom: 20,
    borderColor: '#24CCA7',
  },
  signInBtnMedium: {
    maxWidth: 300,
    width: '100%',
    height: 50,
    borderRadius: 20,
    color: '#24CCA7',
    borderColor: '#24CCA7',
  },
}));

const RegistrationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onRegister = data => dispatch(register(data));

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        confirm: '',
        firstName: '',
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required('Required field')
          .email('Email must be correct'),
        password: Yup.string()
          .min(6, 'Must be equal 6 characters or more')
          .max(12, 'Must be equal 12 characters or less')
          .required('Required field'),
        confirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .min(6, 'Must be equal 6 characters or more')
          .max(12, 'Must be equal 12 characters or less')
          .required('Required field'),
        firstName: Yup.string()
          .min(1, 'Enter your name')
          .max(12, 'Enter 12 symbols or less')
          .required('Required field'),
      }),

      onSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
        console.log(values);
        onRegister(values).then(
          result => {
            console.log('addItem result:', result);
            setSubmitting(false);
            console.log('Add Values:', values);
            resetForm({});
          },
          errors => {
            console.log(errors);
          },
        );
      },
    });
  const setRangeValue = (data, touched) => {
    const countOfTouchedEl = Object.values(touched).length;
    if (!countOfTouchedEl) {
      return;
    }
    const totalValidationValue = 4;
    const totalcountErr = Object.values(data).filter(
      valueErr => valueErr !== '',
    ).length;
    return totalValidationValue - totalcountErr;
  };

  const valuesRange = setRangeValue(errors, touched);
  return (
    <Media
      queries={{
        small: { maxWidth: 767 },
        medium: { minWidth: 768, maxWidth: 1279 },
        large: { minWidth: 1280 },
      }}
    >
      {matches => (
        <div
          className={matches.small ? styles.container : styles.containerMedium}
        >
          <div className={styles.logoBox}>
            <img
              className={matches.small ? styles.logo : styles.logoMedium}
              src={logo}
              alt="wallet"
            />
            <h1 className={styles.text}>Wallet</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className={matches.small ? styles.form : styles.formMedium}
          >
            <TextField
              className={matches.small ? classes.width : classes.widthInput}
              name="email"
              type="email"
              values={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon htmlColor="#E0E0E0" />
                  </InputAdornment>
                ),
              }}
              helperText={touched.email && errors.email}
            />
            <TextField
              className={matches.small ? classes.width : classes.widthInput}
              type="text"
              name="password"
              values={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon htmlColor="#E0E0E0" />
                  </InputAdornment>
                ),
              }}
              helperText={touched.password && errors.password}
            />
            <div className={styles.wrapProgress}>
              <TextField
                className={matches.small ? classes.width : classes.widthInput}
                type="text"
                name="confirm"
                values={values.confirm}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon htmlColor="#E0E0E0" />
                    </InputAdornment>
                  ),
                }}
                helperText={touched.confirm && errors.confirm}
              />
              <div
                className={
                  matches.small ? styles.progressbar : styles.progressbarMedium
                }
              >
                <progress
                  min="0"
                  max="4"
                  value={valuesRange}
                  id="progress"
                ></progress>
              </div>
            </div>
            <TextField
              className={matches.small ? classes.width : classes.widthInput}
              type="text"
              name="firstName"
              values={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter you name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon htmlColor="#E0E0E0" />
                  </InputAdornment>
                ),
              }}
              helperText={touched.firstName && errors.firstName}
            />
            <div className={styles.btnWrapper}>
              <Button
                className={
                  matches.small
                    ? classes.registerBtn
                    : classes.registerBtnMedium
                }
                disabled={valuesRange !== 4}
                type="submit"
              >
                Регистрация
              </Button>
              <Button
                className={
                  matches.small ? classes.signInBtn : classes.signInBtnMedium
                }
              >
                <Link to={routes.login} className={styles.linkBtn}>
                  Войти
                </Link>
              </Button>
            </div>
          </form>
        </div>
      )}
    </Media>
  );
};
export default RegistrationForm;
