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
    <div className='editor'>
      <h2>Editor</h2>
      {emotions && emotions.map(emo => <p key={emo.id}>{emo.name}</p>)}
      {showModal && (
        <Modal>
          <EmotionForm />
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>Add</button>
    </div>
  );
};

export default Editor;
