import styles from "./Layout.module.css"
import { Text } from '@chakra-ui/react'
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <div className={styles.layout_container}>
    <Link href='/'>
      <nav className={styles.header}>
        <img
          src="/undraw_arrow.svg"
          alt="logo"
        />
        <Text fontSize='2xl'>TravelEase</Text>
      </nav>
    </Link>
    {children}
  </div>
}