import React from 'react';
import './Forms.css';

function EmotionForm() {
  return (
    <form className='emotion-form'>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' />

      <div className='bottom'>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default EmotionForm;
