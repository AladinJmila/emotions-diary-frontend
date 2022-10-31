import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmotionForm from '../components/EmotionForm';
import Modal from '../components/Modal';
import { useCategories } from '../hooks/useCategories';

import './Categories.css';

const Editor = () => {
  const [showModal, setShowModal] = useState(false);
  const { categories, loadCategories } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className='editor full-vh'>
      <h2>Editor</h2>
      {categories &&
        categories.map(g => (
          <p
            key={g.id}
            showModal={showModal}
            categories={categories}
            setShowModal={setShowModal}
            onClick={() => navigate(`/categories/${g.id}`)}
          >
            {g.name}
          </p>
        ))}
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
