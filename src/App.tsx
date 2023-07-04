import './App.css';
import EmotionalStateForm from './components/EmotionalStateForm';
import EmotionsBrowser from './components/EmotionsBrowser';
import Visualization from './components/Visualization';
import { useState } from 'react';

function App() {
  const [passThis, setPassThis] = useState('');

  return (
    <div className='app'>
      <Visualization />
      <EmotionalStateForm setPassThis={setPassThis} />
      <EmotionsBrowser passThis={passThis} />
    </div>
  );
}

export default App;
