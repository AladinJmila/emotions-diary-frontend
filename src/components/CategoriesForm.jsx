import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { randomId } from '../utilities/helpers';
import './Forms.css';

const CategoriesForm = ({ setShowModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [posNeg, setPosNeg] = useState(5);
  const { addCategory } = useCategories();

  const handleSubmit = e => {
    e.preventDefault();

    // addEmotion({ id: randomId(), categoryId, name, description });
    console.log({ id: randomId(), name, description, posNeg });
    setName('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <form className='emotion-form' onSubmit={handleSubmit}>
      <button className='close-btn' onClick={() => setShowModal(false)}>
        X
      </button>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <span>Energy</span>
      <div className='flex'>
        <input type='radio' name='energy' id='positive' />
        <label htmlFor='positive'>Positive</label>
      </div>
      <div className='flex'>
        <input type='radio' name='energy' id='negative' />
        <label htmlFor='negative'>Negative</label>
      </div>

      <div className='bottom'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default CategoriesForm;
