import { useState } from 'react';
import { useEmotions } from '../hooks/useEmotions';
import { randomId } from '../utilities/helpers';
import './Forms.css';

const EmotionsForm = ({ setShowModal, categories }) => {
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [posNeg, setPosNeg] = useState(5);
  const { addEmotion } = useEmotions();

  const handleSubmit = e => {
    e.preventDefault();

    // addEmotion({ id: randomId(), categoryId, name, description });
    console.log({ id: randomId(), categoryId, name, description, posNeg });
    setName('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <form className='emotion-form' onSubmit={handleSubmit}>
      <button className='close-btn' onClick={() => setShowModal(false)}>
        X
      </button>
      <label htmlFor='category'>Category</label>
      <select id='category' onChange={e => setCategoryId(e.target.value)}>
        <option value=''></option>
        {categories &&
          categories.map(g => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
      </select>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        cols='30'
        rows='8'
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor='pos-neg-scale'>Positivity Scale</label>
      <input
        type='range'
        id='pos-neg-scale'
        min='1'
        max='10'
        value={posNeg}
        onChange={e => setPosNeg(e.target.value)}
      />
      <div className='bottom'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default EmotionsForm;
