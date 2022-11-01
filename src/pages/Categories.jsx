import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useUI } from '../hooks/useUI';
import EmotionsForm from '../components/EmotionsForm';
import Modal from '../components/Modal';

import './Categories.css';

const Editor = () => {
  const { categories, loadCategories } = useCategories();
  const { showModal, setShowModal } = useUI();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className='editor full-vh'>
      {categories &&
        categories.map(g => (
          <h2 key={g.id} onClick={() => navigate(`/categories/${g.id}`)}>
            {g.name}
          </h2>
        ))}
      {showModal && (
        <Modal>
          <EmotionsForm setShowModal={setShowModal} categories={categories} />
        </Modal>
      )}
      <div className='bottom'>
        <button onClick={() => setShowModal(true)}>Add</button>
      </div>
    </div>
  );
};

export default Editor;
