import styles from './Center.module.scss'

interface CenterProps {
  children?: React.ReactNode
}

const Center: React.FunctionComponent<CenterProps> = ({ children }) => {
  return <div className={styles.center}>{children}</div>
}

export default Center
