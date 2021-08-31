import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css';

function LogInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.containerBg}>
        <div className={styles.imgWrapper}>
          <div className={styles.img} />
          <p className={styles.appName}>Finance App</p>
        </div>

        <div className={styles.formWrapper}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
