const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];

export const initialState = {
  contact: { id: "", name: "", lastName: "", email: "", phone: "" },
  contacts: savedContacts,
  editingId: "",
  selectedContacts: [],
  alert: "",
  searchTerm: "",
  success: "",
  error: null,
  isLoading: false,
  modal: {
    isOpen: false,
    message: "",
    onConfirm: null,
  },
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        contact: initialState.contact,
        success: "Contact added successfully",
        alert: "",
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((item) =>
          item.id === state.editingId
            ? { ...action.payload, id: state.editingId }
            : item
        ),
        contact: initialState.contact,
        editingId: "",
        success: "Contact update successfully",
        alert: "",
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        ),
        success: `${action.payload.name} deleted successfully`,
      };
    case "SET_EDITING":
      return {
        ...state,
        contact: action.payload,
        editingId: action.payload.id,
      };

    case "CANCEL_EDIT":
      return {
        ...state,
        contact: initialState.contact,
        editingId: "",
        alert: "",
      };

    case "TOGGLE_SELECT":
      return {
        ...state,
        selectedContacts: state.selectedContacts.includes(action.payload)
          ? state.selectedContacts.filter((id) => id !== action.payload)
          : [...state.selectedContacts, action.payload],
      };
    case "DELETE_SELECTED":
      return {
        ...state,
        contacts: state.contacts.filter(
          (c) => !state.selectedContacts.includes(c.id)
        ),
        selectedContacts: [],
        success: `${state.selectedContacts.length} contact(s) deleted successfully!`,
      };

    

    case "SET_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };

    case "SET_ALERT":
      return {
        ...state,
        alert: action.payload,
      };

    case "SHOW_MODAL":
      return {
        ...state,
        modal: {
          isOpen: true,
          message: action.payload.message,
          onConfirm: action.payload.onConfirm,
        },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: initialState.modal,
      };
    default:
      return state;
  }
};
export default contactReducer;
