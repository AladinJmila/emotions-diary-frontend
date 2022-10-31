import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import EmotionForm from '../components/EmotionForm';
import Modal from '../components/Modal';

function Category({ showModal, setShowModal, categories }) {
  const { id: categoryId } = useParams();
  const { data: emotions } = useFetch(
    `http://localhost:3000/emotions?categoryId=${categoryId}`
  );

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
