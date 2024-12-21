import styles from "./Button.module.css";

function Button({ children, onClick, type, ...props }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
