import styles from '../commen/container.module.css'

const Container = ({ children, className }) => {
  return (
    <div className={`${styles.mainContainer} ${className && styles.projectsPdSubdetail}`}>{children}</div>
  )
}

export default Container

