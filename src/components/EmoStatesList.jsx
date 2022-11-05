import { useEffect } from 'react';
import { useEmoStates } from '../hooks/useEmoStates';
import EmoState from './EmoState';
import './EmoStatesList.css';

function EmoStatesList() {
  const { emoStates, loadEmoStates } = useEmoStates();

  useEffect(() => {
    !emoStates.length && loadEmoStates();
  }, []);

  return (
    <div className='emo-states-container'>
      <ul>
        {emoStates &&
          emoStates.map(emos => <EmoState key={emos.id} emos={emos} />)}
      </ul>
    </div>
  );
}

export default EmoStatesList;
