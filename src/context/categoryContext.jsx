import { createContext, useReducer } from 'react';
import axios from 'axios';

export const CategoriesContext = createContext();

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };

    default:
      return state;
  }
};

export function CategoriesProvider({ children }) {
  const [state, dispatch] = useReducer(categoriesReducer, initialState);
  const url = 'http://localhost:3000/categories';

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(url);

      dispatch({ type: 'GET_CATEGORIES', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async category => {
    try {
      const { data } = await axios.post(url, category);

      dispatch({ type: 'ADD_CATEGORY', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{ ...state, loadCategories, addCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
