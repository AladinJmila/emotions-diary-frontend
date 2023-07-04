import { useEffect, useState } from 'react';
import './EmotionsBrowser.css';
import { EmotionalState } from './EmotionalStateForm';

interface Props {
  passThis: string;
}

const EmotionsBrowser = ({ passThis }: Props) => {
  const [emotionalState, setEmotionalState] = useState<EmotionalState>();
  useEffect(() => {
    setEmotionalState(JSON.parse(passThis));
  }, [passThis]);

  if (emotionalState)
    return (
      <div className='emotions-browser'>
        <h2>EmotionsBrowser</h2>
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
      </div>
    );
};

export default EmotionsBrowser;
