import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useUI } from '../hooks/useUI';
import { useCategories } from '../hooks/useCategories';
import EmotionForm from '../components/EmotionForm';
import Modal from '../components/Modal';

function Category() {
  const { showModal, setShowModal } = useUI();
  const { categories, loadCategories } = useCategories();
  const { id: categoryId } = useParams();
  const { data: emotions } = useFetch(
    `http://localhost:3000/emotions?categoryId=${categoryId}`
  );

  useEffect(() => {
    !categories.length && loadCategories();
  }, []);

  return (
    <div className='category'>
      {emotions && emotions.map(em => <p key={em.id}>{em.name}</p>)}
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
}

export default Category;
