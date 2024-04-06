import Spinner from "../Spinner/Spinner";
import styles from "./ProcessingButton.module.css"; // Updated path to new CSS module

interface ProcessingButtonProps {
  isProcessing: boolean;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const ProcessingButton: React.FC<ProcessingButtonProps> = ({
  isProcessing,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${isProcessing ? styles.spinner : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isProcessing ? (
        <>
          <Spinner /> Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ProcessingButton;
