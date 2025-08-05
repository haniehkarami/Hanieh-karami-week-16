import { createContext, useEffect, useReducer } from "react";

import contactsreducer, { initialState } from "../contaxt/contactsReducer";

export const ContactsContext = createContext();

function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactsreducer, initialState);
  const { contacts } = state;

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(state.contacts));
  }, [state.contacts]);

  const toggleSelectContact = (id) => {
    dispatch({ type: "TOGGLE_SELECT", payload: id });
  };

  const showModal = (message, onConfirm) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: { message, onConfirm },
    });
  };

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
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

  return (
    <ContactsContext.Provider
      value={{
        ...state,
        dispatch,
        showModal,
        closeModal,
        toggleSelectContact,
        deleteHandler,
        editHandler,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactProvider;
