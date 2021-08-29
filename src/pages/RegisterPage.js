import RegistrationForm from '../components/RegistrationForm';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.conteinerBg}>
        <p className={styles.appName}>Finance App</p>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
