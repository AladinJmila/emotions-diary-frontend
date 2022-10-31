import { createContext, useState } from 'react';

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <UIContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </UIContext.Provider>
  );
}
