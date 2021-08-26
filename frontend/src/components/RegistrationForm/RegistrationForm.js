import routes from '../../routes';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';
import lockIcon from './icons/lock-icon.png';
import mailIcon from './icons/mail-icon.png';
import manIcon from './icons/man-icon.png';
import logo from './icons/logo.png';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: 40,
    width: '100%',
    maxWidth: 280,
    paddingLeft: 0,
    fontFamily: 'Circe',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.5,
  },
}));
const RegistrationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const registrationError = useSelector(authSelectors.getErrorMessage);
  const onRegister = data => dispatch(authOperations.register(data));

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        confirm: '',
        name: '',
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
      }),
      onSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
        console.log(values);
        const { confirm, ...payload } = values;
        onRegister(payload).then(
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

  const setRangeValue = data => {
    const totalValidationValue = 4;
    let keys = Object.keys(data).length;
    return totalValidationValue - keys;
  };

  const valuesRange = setRangeValue(errors);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoBox}>
          <img src={logo} alt="wallet" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrap}>
            <div className={styles.labelWrap} htmlFor="email">
              <img
                className={styles.icon}
                src={mailIcon}
                width="20"
                height="16"
                alt="email"
              />
            </div>
            <TextField
              className={classes.textField}
              name="email"
              type="email"
              id="email"
              values={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter your email"
            />
            {touched.email && errors.email ? (
              <p className={styles.error} style={{ color: 'red' }}>
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className={styles.inputWrap}>
            <div className={styles.labelWrap}>
              <img
                className={styles.icon}
                src={lockIcon}
                width="16"
                height="21"
                alt="lock"
              />
            </div>
            <TextField
              className={classes.textField}
              type="text"
              name="password"
              values={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter your password"
            />
            {touched.password && errors.password ? (
              <p className={styles.error} style={{ color: 'red' }}>
                {errors.password}
              </p>
            ) : null}
          </div>
          <div className={styles.inputWrap}>
            <div className={styles.labelWrap} htmlFor="confirm">
              <img
                className={styles.icon}
                src={lockIcon}
                width="16"
                height="21"
                alt="lock"
              />
            </div>
            <TextField
              className={classes.textField}
              type="text"
              name="confirm"
              values={values.confirm}
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter your password"
            />
            {touched.confirm && errors.confirm ? (
              <p className={styles.error} style={{ color: 'red' }}>
                {errors.confirm}
              </p>
            ) : null}
          </div>

          <div className={styles.progressbar}>
            <progress
              min="0"
              max="4"
              value={valuesRange}
              id="progress"
            ></progress>
          </div>
          <div className={styles.inputWrap}>
            <div className={styles.labelWrap} htmlFor="name">
              <img
                className={styles.icon}
                src={manIcon}
                width="18"
                height="18"
                alt="man"
              />
            </div>

            <TextField
              className={classes.textField}
              type="text"
              name="name"
              values={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter you name"
            />
            {touched.name && errors.name ? (
              <p className={styles.error} style={{ color: 'red' }}>
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.registrBtn}
              disabled={valuesRange !== 4}
              type="submit"
            >
              Регистрация
            </button>
          </div>
        </form>
        <Link to={routes.login} className={styles.linkBtn}>
          Войти
        </Link>
      </div>
    </div>
  );
};
export default RegistrationForm;
