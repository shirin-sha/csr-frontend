import styles from './subcontainer.module.css';
const Subcontainer = ({ children }) => {
  return (
    <div  className={styles.subcontainer}>
      {children}
    </div>
  )
}

export default Subcontainer
