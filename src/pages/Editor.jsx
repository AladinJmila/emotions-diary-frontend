import { useEffect, useState } from 'react';
import EmotionForm from '../components/EmotionForm';
import Modal from '../components/Modal';
import { useEmotions } from '../hooks/useEmotions';
import './Editor.css';

const Editor = () => {
  const [showModal, setShowModal] = useState(false);
  const { emotions, loadEmotions } = useEmotions();

  useEffect(() => {
    loadEmotions();
  }, []);

  return (
    <div className='editor full-vh'>
      <h2>Editor</h2>
      {emotions && emotions.map(emo => <p key={emo.id}>{emo.name}</p>)}
      {showModal && (
        <Modal>
          <EmotionForm setShowModal={setShowModal} />
        </Modal>
      )}
      <div className='bottom'>
        <button onClick={() => setShowModal(true)}>Add</button>
      </div>
    </div>
  );
};

export default Editor;
