import EmoStatesForm from '../components/EmoStatesForm';
import Modal from '../components/Modal';
import { useUI } from '../hooks/useUI';
import './Home.css';

const Home = () => {
  const { showModal, setShowModal } = useUI();

  return (
    <div className='home full-vh'>
      <div className='atlas-emotions'>
        <h3>The Atlas Of Emotions</h3>
        <a href='http://atlasofemotions.org/' target='_blank'>
          learn more about emotions from experts
        </a>
      </div>
      <div className='main-container'>
        <a href='/categories'>
          <h2>Categories</h2>
        </a>
        <a href='/inspector'>
          <h2>Inspect</h2>
        </a>
        <button
          className='add-btn'
          id='add-emo-state-btn'
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <Modal>
          <EmoStatesForm setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default Home;
