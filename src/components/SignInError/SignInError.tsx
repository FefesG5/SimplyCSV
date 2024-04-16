import styles from "./SignInError.module.css";

interface SignInErrorProps {
  message: string;
}

const SignInError: React.FC<SignInErrorProps> = ({ message }) => (
  <div className={styles.errorContainer}>{message}</div>
);

export default SignInError;
