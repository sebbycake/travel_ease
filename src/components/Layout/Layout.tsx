import styles from "./Layout.module.css"
import { Text } from '@chakra-ui/react'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <div className={styles.layout_container}>
    <nav className={styles.header}>
      <img
        src="/undraw_arrow.svg"
        alt="logo"
      />
      <Text fontSize='2xl'>TravelEase</Text>
    </nav>
    {children}
  </div>
}