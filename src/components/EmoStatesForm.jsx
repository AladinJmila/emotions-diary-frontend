import { useState } from 'react';
import { useEffect } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useEmotions } from '../hooks/useEmotions';
import { useEmoStates } from '../hooks/useEmoStates';
import { randomId, shadesOfGrey } from '../utilities/helpers';

function EmoStatesForm({ setShowModal }) {
  const { categories, loadCategories } = useCategories();
  const { emotions, loadEmotions } = useEmotions();
  const { addEmoState } = useEmoStates();
  const [filteredEmotions, setFilteredEmotions] = useState(emotions);
  const [emotionId, setEmotionId] = useState(null);
  const [trigger, setTrigger] = useState('');
  const [intensity, setIntensity] = useState(1);

  const filterEmotions = categoryId => {
    if (categoryId) {
      setFilteredEmotions(emotions.filter(em => em.categoryId === categoryId));
    } else {
      setFilteredEmotions(emotions);
    }
  };

  useEffect(() => {
    !categories.length && loadCategories();
    !emotions.length && loadEmotions();
  }, []);

  const handleSubmit = e => {
    const emotion = filteredEmotions.filter(em => em.id === emotionId)[0];
    const body = {
      id: randomId(),
      emotion,
      trigger,
      intensity,
      date: new Date(),
      color: shadesOfGrey[emotion.posNeg - 1],
    };

    e.preventDefault();
    addEmoState(body);

    setShowModal(false);
  };

  return (
    <form className='emo-state-form' onSubmit={handleSubmit}>
      <button className='close-btn' onClick={() => setShowModal(false)}>
        X
      </button>
      <label htmlFor='categories'>Categories</label>
      <select
        id='categories'
        onChange={e => {
          filterEmotions(e.target.value);
        }}
      >
        <option value=''></option>
        {categories &&
          categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>
      <label htmlFor='emotions'>Emotions</label>
      <select id='emotions' onChange={e => setEmotionId(e.target.value)}>
        <option value=''></option>
        {filteredEmotions &&
          filteredEmotions.map(em => (
            <option key={em.id} value={em.id}>
              {em.name}
            </option>
          ))}
      </select>
      <label htmlFor='trigger'>Trigger</label>
      <textarea
        id='trigger'
        cols='30'
        rows='8'
        value={trigger}
        onChange={e => setTrigger(e.target.value)}
      ></textarea>
      <label htmlFor='intensity'>Intensity: {intensity}</label>
      <input
        type='range'
        id='intensity'
        min='1'
        max='10'
        value={intensity}
        onChange={e => setIntensity(e.target.value)}
      />
      <div className='bottom'>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default EmoStatesForm;
