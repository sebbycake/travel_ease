import styles from "./Button.module.css"

interface ButtonProps {
  label: string;
}

export default function Button({ label }: ButtonProps): JSX.Element {
  return <button className={styles.button}>
    { label }
  </button>
}