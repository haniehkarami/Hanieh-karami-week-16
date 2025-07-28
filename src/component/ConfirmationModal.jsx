import { useContext } from "react";

import { ContactsContext } from "../contaxt/ContactsContext";

import styles from "./ConfirmationModal.module.css";

function ConfirmationModal() {
  const { modal, closeModal } = useContext(ContactsContext);

  if (!modal.isOpen) return null;
  const { message, onConfirm } = modal;

  const ConfirmHandler = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={ConfirmHandler} className={styles.confirmButton}>
            Confirm
          </button>
          <button onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
