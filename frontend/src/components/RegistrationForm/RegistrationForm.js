import routes from '../../routes';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';
import logo from './icons/logo.png';
import { TextField, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  registerBtn: {
    height: 50,
    backgroundColor: '#24CCA7',
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 300,
      width: '100%',
      height: 50,
      borderRadius: 20,
      backgroundColor: '#24CCA7',
      color: '#fff',
      marginBottom: 20,
    },
  },
  width: {
    maxWidth: 280,
    width: '100%',
    marginBottom: 40,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 410,
      width: '100%',
      marginBottom: 40,
    },
  },
}));

const RegistrationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
      name: '',
      showPassword: false,
      showConfirmPassword: false,
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
      name: Yup.string()
        .min(1, 'Enter your name')
        .max(12, 'Enter 12 symbols or less')
        .required('Required field'),
      showPassword: Yup.bool().default('false'),
      showConfirmPassword: Yup.bool().default('false'),
    }),
    onSubmit: ({ email, password, name }) => {
      dispatch(authOperations.register({ email, password, name }));
      push(routes.login);
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
    <div className={styles.innerContainer}>
      <div className={styles.logoBox}>
        <img className={styles.logo} src={logo} alt="wallet" />
        <h1 className={styles.text}>Wallet</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          className={classes.width}
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
          className={classes.width}
          type={values.showPassword ? 'text' : 'password'}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{ color: '#E0E0E0' }}
                  type="bool"
                  name="showPassword"
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setValues(prev => ({
                      ...prev,
                      showPassword: !prev.showPassword,
                    }))
                  }
                  onMouseDown={e => e.preventDefault()}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={touched.password && errors.password}
        />
        <div className={styles.wrapProgress}>
          <TextField
            className={classes.width}
            type={values.showConfirmPassword ? 'text' : 'password'}
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: '#E0E0E0' }}
                    type="bool"
                    name="showConfirmPassword"
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setValues(prev => ({
                        ...prev,
                        showConfirmPassword: !prev.showConfirmPassword,
                      }))
                    }
                    onMouseDown={e => e.preventDefault()}
                  >
                    {values.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={touched.confirm && errors.confirm}
          />
          <div className={styles.progressbar}>
            <progress
              min="0"
              max="4"
              value={valuesRange}
              id="progress"
            ></progress>
          </div>
        </div>
        <TextField
          className={classes.width}
          type="text"
          name="name"
          values={values.name}
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
            variant="contained"
            color="primary"
            type="submit"
            style={{
              marginBottom: 20,
              width: '100%',
              maxWidth: 280,
              borderRadius: 20,
              padding: '13px 68px',
            }}
          >
            Регистрация
          </Button>
          <Link to={routes.login} className={styles.linkBtn}>
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
