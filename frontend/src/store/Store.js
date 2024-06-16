import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  dataTopic: [],
  dataDepartment: [],
  geoData: null,
  loadingTopic: false,
  loadingDepartment: false,
  loadingGeoData: false,
  error: null
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS_Topic':
      return { ...state, dataTopic: action.payload, loadingTopic: false };
    case 'FETCH_SUCCESS_Department':
      return { ...state, dataDepartment: action.payload, loadingDepartment: false };
    case 'FETCH_SUCCESS_GeoData':
      return { ...state, geoData: action.payload, loadingGeoData: false };
    case 'FETCH_ERROR':
      return { ...state, loadingTopic: false, loadingDepartment: false, loadingGeoData: false, error: action.payload };
    case 'FETCH_START_Topic':
      console.log('FETCH_START_Topic'); 
      return { ...state, loadingTopic: true };
    case 'FETCH_START_Department':
      return { ...state, loadingDepartment: true };
    case 'FETCH_START_GeoData':
      return { ...state, loadingGeoData: true };
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

