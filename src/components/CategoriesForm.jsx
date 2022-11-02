import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { randomId } from '../utilities/helpers';
import './Forms.css';

const CategoriesForm = ({ setShowModal }) => {
  const [name, setName] = useState('');
  const [energy, setEnergy] = useState('positive');
  const { addCategory } = useCategories();

  const handleSubmit = e => {
    e.preventDefault();

    // addCategory({ id: randomId(),  name, energy });
    console.log({ id: randomId(), name, energy });
    setName('');
    setShowModal(false);
  };

  const isSelected = value => energy === value;

  return (
    <form className='category-form' onSubmit={handleSubmit}>
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
        <input
          type='radio'
          name='energy'
          id='positive'
          value='positive'
          checked={isSelected('positive')}
          onChange={e => setEnergy(e.target.value)}
        />
        <label htmlFor='positive'>Positive</label>
      </div>
      <div className='flex'>
        <input
          type='radio'
          name='energy'
          id='negative'
          value='negative'
          checked={isSelected('negative')}
          onChange={e => setEnergy(e.target.value)}
        />
        <label htmlFor='negative'>Negative</label>
      </div>

      <div className='bottom'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default CategoriesForm;
