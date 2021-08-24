import routes from '../../routes';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as logIn from '../../redux/auth/auth-operations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';
import lockIcon from '../RegistrationForm/icons/lock-icon.png';
import mailIcon from '../RegistrationForm/icons/mail-icon.png';
import logo from '../RegistrationForm/icons/logo.png';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    marginBottom: 40,
    width: '100%',
    maxWidth: 280,
    paddingLeft: 0,
  },
});
const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onLogin = data => dispatch(logIn(data));

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
      onSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
        console.log(values);
        onLogin(values).then(
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

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoBox}>
          <img src={logo} alt="wallet" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrap}>
            <label className={styles.labelWrap} htmlFor="email">
              <img
                className={styles.icon}
                src={mailIcon}
                width="20"
                height="16"
                alt="email"
              />
            </label>
            <TextField
              className={classes.textField}
              name="email"
              type="email"
              id="email"
              values={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {touched.email && errors.email ? (
              <p className={styles.error} style={{ color: 'red' }}>
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className={styles.inputWrap}>
            <label className={styles.labelWrap} htmlFor="password">
              <img
                className={styles.icon}
                src={lockIcon}
                width="16"
                height="21"
                alt="lock"
              />
            </label>
            <TextField
              className={classes.textField}
              type="text"
              name="password"
              values={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {touched.password && errors.password ? (
              <p className={styles.error} style={{ color: 'red' }}>
                {errors.password}
              </p>
            ) : null}
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.registrBtn} type="submit">
              Вход
            </button>
          </div>
        </form>
        <Link to={routes.register} className={styles.linkBtn}>
          Регистрация
        </Link>
      </div>
    </div>
  );
};
export default LoginForm;
