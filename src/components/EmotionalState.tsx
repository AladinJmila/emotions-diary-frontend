import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EmotionalState {
  id: number;
  name: string;
}

const EmotionalState = () => {
  const [emotionalStates, setEmotionalStates] = useState<EmotionalState[]>([]);
  const [stateDescription, setStateDescription] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/emotional-states/')
      .then((res: any) => {
        setEmotionalStates(res.data);
      });
  }, []);

  return (
    <>
      <div className='log-state'>
        <button>What's on your mind?</button>
        <textarea
          cols={50}
          rows={25}
          onChange={e => setStateDescription(e.target.value)}
        ></textarea>
        <button>
          Ask ChatGPT and bring back the data to paste in box below
        </button>
        <textarea
          cols={50}
          rows={25}
          onChange={e => setStateDescription(e.target.value)}
        ></textarea>
        <button>Save emotional state</button>
      </div>
      {/* <div>EmotionalState</div>
      {emotionalStates.map(es => (
        <p key={es.id}>{es.name}</p>
      ))} */}
    </>
  );
};

export default EmotionalState;
