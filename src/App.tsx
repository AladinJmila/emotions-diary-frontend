import './App.css';
import EmotionalStateForm from './components/EmotionalStateForm';
import EmotionsBrowser from './components/EmotionsBrowser';
import Visualization from './components/Visualization';
import { useState } from 'react';

function App() {
  const [emotionJSON, setEmotionJSON] = useState('');

  return (
    <div className='app'>
      <Visualization />
      <EmotionalStateForm setEmotionJSON={setEmotionJSON} />
      <EmotionsBrowser emotionJSON={emotionJSON} />
    </div>
  );
}

export default App;
