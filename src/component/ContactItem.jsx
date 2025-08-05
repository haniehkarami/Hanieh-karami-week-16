import { useContext } from "react";

import { ContactsContext } from "../contaxt/ContactsContext";

import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  searchTerm,
  editHandler,
}) {
  const { deleteHandler, toggleSelectContact, selectedContacts } =
    useContext(ContactsContext);

  const isMatch = () => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(term) ||
      lastName.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term) ||
      phone.includes(searchTerm)
    );
  };

  // اگر با جستجو مطابقت نداشت، چیزی رندر نکن
  if (!isMatch()) return null;

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={selectedContacts.includes(id)}
        onChange={() => toggleSelectContact(id)}
      />

      <div className={styles.contactInfo}>
        <p>
          {name} {lastName}
        </p>
        <p>📬 {email}</p>
        <p>☎️ {phone}</p>
      </div>

      <div className={styles.actions}>
        <button onClick={() => editHandler(id)}>🖋️</button>
        <button onClick={() => deleteHandler(id, name)}>🗑️</button>
      </div>
    </li>
  );
}

export default ContactItem;
