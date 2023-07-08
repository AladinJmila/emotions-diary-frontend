import { useEffect, useState } from 'react';
import './EmotionsBrowser.css';
import { EmotionalState } from './EmotionalStateForm';
import axios from 'axios';

interface Props {
  emotionJSON: string;
}

interface DBEmotionalSate {
  id?: number;
  name: string;
  description: string;
  energy: number;
  intensity: number;
  triggers: string;
  coping_mechanisms: string;
  tags: string;
}

const EmotionsBrowser = ({ emotionJSON }: Props) => {
  const [emotionalState, setEmotionalState] = useState<EmotionalState | null>();
  const [error, setError] = useState('');
  useEffect(() => {
    if (emotionJSON) {
      try {
        setEmotionalState(JSON.parse(emotionJSON));
      } catch (error: any) {
        setError(error.message);
        setEmotionalState(null);
        console.log(error.message);
      }
    }
  }, [emotionJSON]);

  const handleSave = (input: EmotionalState) => {
    const data: DBEmotionalSate = {
      name: input.name,
      description: input.description,
      energy: input.energy,
      intensity: input.intensity,
      triggers: input.triggers.join('|'),
      coping_mechanisms: input.copingMechanisms.join('|'),
      tags: input.tags.join('|'),
    };
    console.log(data);
    axios.post('http://127.0.0.1:8000/api/emotional-states/', data);
  };

  return (
    <div className='emo-browser'>
      <h2>EmotionsBrowser</h2>
      <div className='emo-browser-body'>
        {emotionalState ? (
          <>
            <h3>{emotionalState.name}</h3>
            <p>{emotionalState.description}</p>
            <p>
              <b>Energy: </b>
              {emotionalState.energy * 10}
            </p>
            <p>
              <b>Intensity: </b>
              {emotionalState.intensity * 10}
            </p>
            <p>Triggers:</p>
            <ul>
              {emotionalState.triggers.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>Coping Mechanisms:</p>
            <ul>
              {emotionalState.copingMechanisms.map(cm => (
                <li key={cm}>{cm}</li>
              ))}
            </ul>
            <p>Tags:</p>
            <div>
              {emotionalState.tags.map(cm => (
                <span key={cm}>{cm}, </span>
              ))}
            </div>
          </>
        ) : (
          <p className='error-msg'>Error: {error}</p>
        )}
      </div>

      <button
        className='emo-save-btn'
        onClick={() => handleSave(JSON.parse(emotionJSON))}
        disabled={Boolean(!emotionJSON)}
      >
        Save
      </button>
    </div>
  );
};

export default EmotionsBrowser;
