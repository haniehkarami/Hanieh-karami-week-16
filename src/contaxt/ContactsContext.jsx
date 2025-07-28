import { createContext, useEffect, useReducer } from "react";

import contactsreducer, { initialState } from "../contaxt/contactsReducer";

export const ContactsContext = createContext();

function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactsreducer, initialState);

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

  return (
    <ContactsContext.Provider
      value={{
        ...state,
        dispatch,
        showModal,
        closeModal,
        toggleSelectContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactProvider;
