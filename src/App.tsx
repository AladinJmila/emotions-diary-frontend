import './App.css';
import EmotionalStateInput from './components/EmotionalStateInput';
import EmotionsBrowser from './components/EmotionsBrowser';
import Visualization from './components/Visualization';
import { useState } from 'react';

function App() {
  const [emotionJSON, setEmotionJSON] = useState('');

  return (
    <div className='app'>
      <Visualization />
      <EmotionalStateInput setEmotionJSON={setEmotionJSON} />
      <EmotionsBrowser emotionJSON={emotionJSON} />
    </div>
  );
}

export default App;
