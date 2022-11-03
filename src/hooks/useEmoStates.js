import { useContext } from 'react';
import { EmoStatesContext } from '../context/emoStatesContext';

export const useEmoStates = () => {
  const context = useContext(EmoStatesContext);

  if (context === 'undefined')
    throw new Error('useEmoStates() must be inside EmoStatesProvider');

  return context;
};
