import styles from "./ContactFormModal.module.css";


function ContactFormModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        {children}
      </div>
    </div>
  );
}

export default ContactFormModal;
