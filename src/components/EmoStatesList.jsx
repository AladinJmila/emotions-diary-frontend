import EmoState from './EmoState';
import './EmoStatesList.css';

function EmoStatesList({ paginated, currentPage }) {
  return (
    <div className='emo-states-container'>
      {paginated && (
        <ul>
          {currentPage &&
            currentPage.map(emos => <EmoState key={emos.id} emos={emos} />)}
        </ul>
      )}
    </div>
  );
}

export default EmoStatesList;
