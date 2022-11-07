import { useEffect } from 'react';
import { useEmoStates } from '../hooks/useEmoStates';
import EmoState from './EmoState';
import './EmoStatesList.css';

function EmoStatesList() {
  const { emoStates, loadEmoStates } = useEmoStates();

  useEffect(() => {
    !emoStates.length && loadEmoStates();
    emoStates.length && paginate(emoStates);
  }, [emoStates]);

  const paginate = emoStates => {
    const today = new Date();
    let currentDate = today;
    let dayCount = 0;
    const paginated = [];

    for (let i = emoStates.length - 1; i >= 0; i--) {
      if (new Date(emoStates[i].date).getDate() === currentDate.getDate()) {
        if (!paginated[dayCount]) {
          paginated[dayCount] = [emoStates[i]];
        } else {
          paginated[dayCount] = [...paginated[dayCount], emoStates[i]];
        }
      } else {
        dayCount++;
        currentDate.setDate(today.getDate() - 1);
      }
      console.log(currentDate);
    }

    console.log('paginated');
    console.log(paginated);
  };

  return (
    <div className='emo-states-container'>
      <span className='date'>
        {new Date(emoStates[0]?.date).toDateString()}
      </span>
      <ul>
        {emoStates &&
          emoStates.map(emos => <EmoState key={emos.id} emos={emos} />)}
      </ul>
    </div>
  );
}

export default EmoStatesList;
