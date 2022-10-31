import { useContext } from 'react';
import { CategoriesContext } from '../context/categoryContext';

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (context === 'undefined')
    throw new Error('useCategories() must be inside a CategoriesProvider');

  return context;
};
