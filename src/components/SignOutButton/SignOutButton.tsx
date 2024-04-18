import styles from "./SignOutButton.module.css";

interface SignOutButtonProps {
  signOutUser: () => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ signOutUser }) => {
  return (
    <button className={styles.button} onClick={signOutUser}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
