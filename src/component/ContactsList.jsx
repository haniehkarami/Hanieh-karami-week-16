import { useContext } from "react";

import { ContactsContext } from "../contaxt/ContactsContext";

import ContactItem from "./ContactItem";

import styles from "./ContactsList.module.css";

function ContactsList({ searchTerm }) {
  const {
    contacts,
    deleteHandler,
    editHandler,
    toggleSelectContact ,
    selectedContacts,
  } = useContext(ContactsContext);

  return (
    <div className={styles.container}>
      <h3>Contacts List</h3>
      {/* اگر صفر نبود و وجود داشت مپ بزن و کانتکت ها را نشان بده اگر نه تگ پی را نشان بده */}
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              searchTerm={searchTerm}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Contact Yet!</p>
      )}
    </div>
  );
}
export default ContactsList;
