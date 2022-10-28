import { useState, useEffect } from 'react';
import { useEmotions } from '../hooks/useEmotions';
import { randomId } from '../utilities/helpers';
import './Forms.css';

const EmotionForm = ({ setShowModal }) => {
  const [groupId, setGroupId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { emotions, loadEmotions, addEmotion } = useEmotions();

  useEffect(() => {
    loadEmotions();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    addEmotion({ id: randomId(), groupId, name, description });
    console.log({ id: randomId(), groupId, name, description });
    setName('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <form className='emotion-form' onSubmit={handleSubmit}>
      <label htmlFor='group'>Group</label>
      <select id='group' onChange={e => setGroupId(e.target.value)}>
        <option value=''></option>
        {emotions &&
          emotions.map(em => (
            <option key={em.id} value={em.id}>
              {em.name}
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
        rows='10'
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>

      <div className='bottom'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default EmotionForm;
