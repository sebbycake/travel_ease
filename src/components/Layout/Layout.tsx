import styles from "./Layout.module.css"

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
      <h1>TravelEase</h1>
    </nav>
    {children}
  </div>
}