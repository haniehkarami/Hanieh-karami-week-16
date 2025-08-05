import { useState, useEffect, useContext } from "react";
import { v4 } from "uuid";
import { ContactsContext } from "../contaxt/ContactsContext";

import ContactsList from "./ContactsList";
import ContactForm from "./ContactForm";
import inputs from "../constants/inputs";
import ConfirmationModal from "./ConfirmationModal";

import styles from "./Contacts.module.css";
import toast from "react-hot-toast";
import ContactFormModal from "./ContactFormModal";

function Contacts() {
  const {
    contacts,
    alert,
    contact,
    editingId,
    selectedContacts,
    success,
    modal,
    dispatch,
    showModal,
    closeModal,
    editHandler,
  } = useContext(ContactsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (success) {
      toast.success(success);

      const timer = setTimeout(() => {
        dispatch({ type: "SET_SUCCESS", payload: "" });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (alert) {
      toast.error(alert);

      const timer = setTimeout(() => {
        dispatch({ type: "SET_ALERT", payload: "" });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  const cancelEdit = () => {
    dispatch({ type: "CANCEL_EDIT" });
  };

  const handelEdit = (id) => {
    editHandler(id);
    setIsModalOpen(true);
  };

  const deletedSelected = () => {
    if (selectedContacts.length) {
      showModal(
        `Are you sure you want to delete ${selectedContacts.length} contacts ?`,
        () => {
          dispatch({ type: "DELETE_SELECTED" });
        }
      );
    }
  };
  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.lastName.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.phone.includes(searchTerm)
    );
  });

  return (
    <div className={styles.container}>
      

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ContactForm
          contact={contact}
          editingId={editingId}
          submitHandler={(data) => {
            if (editingId) {
              dispatch({ type: "UPDATE_CONTACT", payload: data });
            } else {
              dispatch({ type: "ADD_CONTACT", payload: { ...data, id: v4() } });
            }
            setIsModalOpen(false);
          }}
        />
      </ContactFormModal>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name, last name, email or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
<div>
<button
        onClick={() => {
          dispatch({ type: "CANCEL_EDIT" });
          setIsModalOpen(true);
        }}
        className={styles.addButton}
      >
      Add contact
      </button>
</div>

  
      <ContactsList
        contacts={searchTerm ? filteredContacts : contacts}
        searchTerm={searchTerm}
        editHandler={handelEdit}
      />
      <ConfirmationModal />
      {selectedContacts.length > 0 && (
        <button
          onClick={deletedSelected}
          className={styles.deleteSelectedButton}
        >
          Delete Selected ({selectedContacts.length})
        </button>
      )}
    </div>
  );
}

export default Contacts;
