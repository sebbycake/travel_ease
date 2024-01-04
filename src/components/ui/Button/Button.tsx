import Link from "next/link";
import styles from "./Button.module.css"

interface ButtonProps {
  label: string;
  href: string;
}

export default function Button({ label, href }: ButtonProps): JSX.Element {
  return <Link className={styles.button} href={href}>
    {label}
  </Link>
} 