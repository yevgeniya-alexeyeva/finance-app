import routes from '../../routes';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';
import logo from '../RegistrationForm/icons/logo.png';
import { TextField, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
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

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
      showPassword: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required field')
        .email('Email must be correct'),
      password: Yup.string()
        .min(6, 'Must be equal 6 characters or more')
        .max(12, 'Must be equal 12 characters or less')
        .required('Required field'),
      showPassword: Yup.bool().default('false'),
    }),
    onSubmit: ({ email, password }) => {
      dispatch(authOperations.logIn({ email, password }));
    },
  });

  return (
    <div className={styles.container}>
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
          helperText={touched.password && errors.password}
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
                    setValues(prev => ({ showPassword: !prev.showPassword }))
                  }
                  onMouseDown={e => e.preventDefault()}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
            Войти
          </Button>
          <Link to={routes.register} className={styles.linkBtn}>
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
