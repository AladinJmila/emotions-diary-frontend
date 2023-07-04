import './App.css';
import EmotionalStateForm from './components/EmotionalStateForm';
import EmotionsBrowser from './components/EmotionsBrowser';
import Visualization from './components/Visualization';

function App() {
  return (
    <div className='app'>
      <Visualization />
      <EmotionalStateForm />
      <EmotionsBrowser />
    </div>
  );
}

export default App;
