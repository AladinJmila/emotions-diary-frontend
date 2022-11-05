import { useEffect } from 'react';
import { useEmoStates } from '../hooks/useEmoStates';

function EmoStatesList() {
  const { emoStates, loadEmoStates } = useEmoStates();

  useEffect(() => {
    !emoStates.length && loadEmoStates();
  }, []);

  return (
    <div className='emo-states-container'>
      <ul>
        {emoStates &&
          emoStates.map(emos => <li key={emos.id}>{emos.emotion.name}</li>)}
      </ul>
    </div>
  );
}

export default EmoStatesList;
