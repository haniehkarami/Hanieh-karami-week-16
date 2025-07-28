import { useState, useEffect, useContext } from "react";
import { v4 } from "uuid";
import { ContactsContext } from "../contaxt/ContactsContext";

import ContactsList from "./ContactsList";
import inputs from "../constants/inputs";
import ConfirmationModal from "./ConfirmationModal";

import styles from "./Contacts.module.css";

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
  } = useContext(ContactsContext);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_SUCCESS", payload: "" });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const changeHandeler = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
  };
  const validateInputs = () => {
    if (!contact.name) return "Name is required!";
    if (!contact.lastName) return "Last name is required!";
    if (!contact.email) return "Email is required!";
    if (!contact.phone) return "Phone is required!";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      return "Please enter a valid email (e.g., user@example.com)";
    }

    if (!/^\d{8,}$/.test(contact.phone.replace(/\D/g, ""))) {
      return "Phone must contain at least 8 digits";
    }

    return null;
  };

  const addHandler = () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      dispatch({ type: "SET_ALERT", payload: errorMessage });
      return;
    }
    const newContact = { ...contact, id: v4() };
    dispatch({ type: "ADD_CONTACT", payload: newContact });
  };

  const updateHandler = () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      dispatch({ type: "SET_ALERT", payload: errorMessage });
      return;
    }
    dispatch({ type: "UPDATE_CONTACT", payload: contact });
  };

  const deleteHandler = (id, name) => {
    showModal(`Are you sure you want to delete ${name} ? `, () => {
      dispatch({ type: "DELETE_CONTACT", payload: { id, name } });
    });
  };

  const editHandler = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    dispatch({ type: "SET_EDITING", payload: contactToEdit });
  };

  const cancelEdit = () => {
    dispatch({ type: "CANCEL_EDIT" });
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
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name, last name, email or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      {editingId && (
        <div className={styles.editAlert}>
          <p>You are editing a contact</p>
          <button onClick={cancelEdit}>✖️</button>
        </div>
      )}
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandeler}
          />
        ))}

        <button onClick={editingId ? updateHandler : addHandler}>
          {editingId ? "Update Contact" : "Add Contact"}
        </button>
      </div>

      {alert && (
        <div className={styles.errorAlert}>
          <p>{alert}</p>
        </div>
      )}

      {success && (
        <div className={styles.alert}>
          <p>{success}</p>
        </div>
      )}

      <ContactsList contacts={searchTerm ? filteredContacts : contacts} />
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
