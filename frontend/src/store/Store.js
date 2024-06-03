import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  dataTopic: [],
  dataDepartment: [],
  loading: true,
  error: null
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS_Topic':
      return { ...state, dataTopic: action.payload, loading: false };
    case 'FETCH_SUCCESS_Department':
      return { ...state, dataDepartment: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create context
const StoreContext = createContext();

// Store provider
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use store
const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };
