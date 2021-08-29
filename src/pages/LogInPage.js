import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css';

function LogInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.conteinerBg}>
        <p className={styles.appName}>Finance App</p>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
