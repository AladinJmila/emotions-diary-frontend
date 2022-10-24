import { createContext, useReducer } from 'react';
import axios from 'axios';
import { useFetch } from '../hooks/useFetch';

export const EmotionsContext = createContext();

const intialState = {
  emotions: [],
  selectedEmotions: null,
  loading: false,
  error: null,
};

const emotionsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EMOTIONS':
      return { ...state, emotions: action.payload };

    default:
      return state;
  }
};

export function EmotionsProvider({ children }) {
  const [state, dispatch] = useReducer(emotionsReducer, intialState);

  // const payload = useFetch('http://localhost:3000/emotions');
  const loadEmotions = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/emotions');

      dispatch({ type: 'GET_EMOTIONS', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EmotionsContext.Provider value={{ ...state, loadEmotions }}>
      {children}
    </EmotionsContext.Provider>
  );
}
