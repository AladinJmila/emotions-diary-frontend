import { createContext, useReducer } from 'react';
import axios from 'axios';

export const EmotionsContext = createContext();

const initialState = {
  emotions: [],
  loading: false,
  error: null,
};

const emotionsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EMOTIONS':
      return { ...state, emotions: action.payload };

    case 'ADD_EMOTION':
      return { ...state, emotions: [...state.emotions, action.payload] };

    default:
      return state;
  }
};

export function EmotionsProvider({ children }) {
  const [state, dispatch] = useReducer(emotionsReducer, initialState);
  const url = 'http://localhost:3000/emotions';

  const loadEmotions = async () => {
    try {
      const { data } = await axios.get(url);

      dispatch({ type: 'GET_EMOTIONS', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const addEmotion = async emotion => {
    try {
      const { data } = await axios.post(url, emotion);

      dispatch({ type: 'ADD_EMOTION', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EmotionsContext.Provider value={{ ...state, loadEmotions, addEmotion }}>
      {children}
    </EmotionsContext.Provider>
  );
}
