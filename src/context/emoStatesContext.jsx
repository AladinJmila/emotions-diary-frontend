import { createContext, useReducer } from 'react';
import axios from 'axios';

export const EmoStatesContext = createContext();

const initialState = {
  emoStates: [],
  loading: false,
  error: null,
};

const emoStatesReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EMO_STATES':
      return { ...state, emoStates: action.payload };

    case 'ADD_EMO_STATE':
      return { ...state, emoStates: [...state.emoStates, action.payload] };

    default:
      return state;
  }
};

export function EmoStatesProvider({ children }) {
  const [state, dispatch] = useReducer(emoStatesReducer, initialState);
  const url = 'http://localhost:3000/emo-states';

  const loadEmoStates = async () => {
    try {
      const { data } = await axios.get(url);

      dispatch({ type: 'GET_EMO_STATES', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const addEmoState = async emoState => {
    try {
      const { data } = await axios.post(url, emoState);

      dispatch({ type: 'ADD_EMO_STATE', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EmoStatesContext.Provider value={{ ...state, loadEmoStates, addEmoState }}>
      {children}
    </EmoStatesContext.Provider>
  );
}
