import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useUI } from '../hooks/useUI';
import CategoriesForm from '../components/CategoriesForm';
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
    <div className='categories full-vh'>
      {categories &&
        categories.map(g => (
          <button key={g.id} onClick={() => navigate(`/categories/${g.id}`)}>
            {g.name}
          </button>
        ))}
      {showModal && (
        <Modal>
          <CategoriesForm setShowModal={setShowModal} categories={categories} />
        </Modal>
      )}
      <div className='bottom'>
        <button className='add-btn' onClick={() => setShowModal(true)} />
      </div>
    </div>
  );
};

export default Editor;
