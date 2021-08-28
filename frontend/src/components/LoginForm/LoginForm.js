import routes from '../../routes';
// import {useCallback} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';
import logo from '../RegistrationForm/icons/logo.png';
import Media from 'react-media';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required('Required field')
          .email('Email must be correct'),
        password: Yup.string()
          .min(6, 'Must be equal 6 characters or more')
          .max(12, 'Must be equal 12 characters or less')
          .required('Required field'),
      }),
      onSubmit: ({ email, password }) => {
        dispatch(authOperations.logIn({ email, password }));
      },
    });

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

            <div className={styles.btnWrapper}>
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
                Войти
              </Button>
              <Link to={routes.register} className={styles.linkBtn}>
                Регистрация
              </Link>
            </div>
          </form>
        </div>
      )}
    </Media>
  );
};

export default RegistrationForm;
