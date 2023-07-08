import { useEffect, useState } from 'react';
import './EmotionsBrowser.css';
import { EmotionalState } from './EmotionalStateInput';
import axios from 'axios';
import EmotionForm from './EmotionForm';

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

interface Response {
  data: DBEmotionalSate[];
}

const EmotionsBrowser = ({ emotionJSON }: Props) => {
  const [emotionalStates, setEmotionalStates] = useState<EmotionalState[]>([]);
  const [emotionalState, setEmotionalState] = useState<EmotionalState | null>();
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/emotional-states/')
      .then((res: Response) => {
        setEmotionalStates(res.data.map(emo => DBtoUIemo(emo)));
      });
  }, []);

  const DBtoUIemo = (emo: DBEmotionalSate): EmotionalState => {
    return {
      name: emo.name,
      description: emo.description,
      intensity: emo.intensity,
      energy: emo.energy,
      triggers: emo.triggers.split('|'),
      copingMechanisms: emo.coping_mechanisms.split('|'),
      tags: emo.tags.split('|'),
    };
  };

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
      <div className='emo-viewer'>
        <h2>EmotionsBrowser</h2>
        <div className='emo-browser-body'>
          <EmotionForm emotionalState={emotionalState} />
          {/* {emotionalState ? (
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
              <p>
                <b>Triggers:</b>
              </p>
              <ul>
                {emotionalState.triggers.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p>
                <b>Coping Mechanisms:</b>
              </p>
              <ul>
                {emotionalState.copingMechanisms.map(cm => (
                  <li key={cm}>{cm}</li>
                ))}
              </ul>
              <p>
                <b>Tags:</b>
              </p>
              <div>
                {emotionalState.tags.map(cm => (
                  <span key={cm}>{cm}, </span>
                ))}
              </div>
            </>
          ) : (
            <p className='error-msg'>Error: {error}</p>
          )} */}
        </div>

        <button
          className='emo-save-btn'
          onClick={() => handleSave(JSON.parse(emotionJSON))}
          disabled={Boolean(!emotionJSON)}
        >
          Save
        </button>
      </div>
      <div className='emo-list'>
        {emotionalStates &&
          emotionalStates.map(emo => (
            <button key={emo.id} onClick={() => setEmotionalState(emo)}>
              {emo.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default EmotionsBrowser;
