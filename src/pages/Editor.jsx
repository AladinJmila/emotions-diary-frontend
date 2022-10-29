import { useEffect, useState } from 'react';
import EmotionForm from '../components/EmotionForm';
import Modal from '../components/Modal';
import { useEmotions } from '../hooks/useEmotions';
import { useFetch } from '../hooks/useFetch';

import './Editor.css';

const Editor = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: categories } = useFetch('http://localhost:3000/categories');

  return (
    <div className='editor full-vh'>
      <h2>Editor</h2>
      {categories && categories.map(g => <p key={g.id}>{g.name}</p>)}
      {showModal && (
        <Modal>
          <EmotionForm setShowModal={setShowModal} categories={categories} />
        </Modal>
      )}
      <div className='bottom'>
        <button onClick={() => setShowModal(true)}>Add</button>
      </div>
    </div>
  );
};

export default Editor;
