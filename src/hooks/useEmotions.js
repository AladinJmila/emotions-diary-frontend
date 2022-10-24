import { useContext } from 'react';
import { EmotionsContext } from '../context/emotionsContext';

export const useEmotions = () => {
  const context = useContext(EmotionsContext);

  if (context === undefined)
    throw new Error('useEmotions() must be inside an EmotionsProvider');

  return context;
};
