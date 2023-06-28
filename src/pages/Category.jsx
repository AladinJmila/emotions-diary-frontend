import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useUI } from '../hooks/useUI';
import { useCategories } from '../hooks/useCategories';
import EmotionsForm from '../components/EmotionsForm';
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
      {emotions && emotions.map(em => <button key={em.id}>{em.name}</button>)}
      {showModal && (
        <Modal>
          <EmotionsForm setShowModal={setShowModal} categories={categories} />
        </Modal>
      )}
      <div className='bottom'>
        <button className='add-btn' onClick={() => setShowModal(true)} />
      </div>
    </div>
  );
}

export default Category;
