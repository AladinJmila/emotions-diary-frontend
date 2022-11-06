import { useState } from 'react';
import EmoStatesList from '../components/EmoStatesList';
import OneDayViz from '../components/OneDayViz';
import './Inspector.css';

const Inspector = () => {
  const [showEmotSate, setShowEmoState] = useState(true);
  const [showOneDatViz, setShwOneDayViz] = useState(false);

  return (
    <div className='inspector'>
      {showEmotSate && <EmoStatesList />}
      {showOneDatViz && <OneDayViz />}
      <div className='buttons bottom'>
        <button
          onClick={() => {
            setShowEmoState(true);
            setShwOneDayViz(false);
          }}
        >
          List
        </button>
        <button
          onClick={() => {
            setShowEmoState(false);
            setShwOneDayViz(true);
          }}
        >
          Viz
        </button>
      </div>
    </div>
  );
};

export default Inspector;
