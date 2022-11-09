import { useEffect, useState } from 'react';
import { useEmoStates } from '../hooks/useEmoStates';
import EmoState from './EmoState';
import './EmoStatesList.css';

function EmoStatesList() {
  const { emoStates, loadEmoStates } = useEmoStates();
  const [paginated, setPaginated] = useState(null);
  const [currentPage, setCurrentPage] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    !emoStates.length && loadEmoStates();
    if (emoStates.length) {
      setPaginated(paginate(emoStates));
      setCurrentPage(paginate(emoStates)[pageIndex]);
    }
  }, [emoStates, pageIndex]);

  function paginate() {
    const paginated = [];
    let dayIndex = 0;

    for (let i = emoStates.length - 1; i >= 1; i--) {
      const current = emoStates[i];
      const prev = emoStates[i - 1];
      const currentDate = new Date(current.date);
      const prevDate = new Date(prev.date);

      if (!paginated[dayIndex]) paginated[dayIndex] = [];
      paginated[dayIndex].push(emoStates[i]);

      if (
        currentDate.getDate() === prevDate.getDate() &&
        currentDate.getMonth() === prevDate.getMonth() &&
        currentDate.getFullYear() === prevDate.getFullYear()
      ) {
        continue;
      } else {
        dayIndex++;
      }
    }
    return paginated;
  }

  return (
    <div className='emo-states-container'>
      {paginated && (
        <>
          <div
            className='buttons'
            style={{ justifyContent: 'space-between', marginBottom: 30 }}
          >
            <p
              onClick={() => {
                if (pageIndex < paginated.length - 1)
                  setPageIndex(pageIndex + 1);
              }}
            >
              prev
            </p>
            <p
              onClick={() => {
                if (pageIndex > 0) setPageIndex(pageIndex - 1);
              }}
            >
              next
            </p>
          </div>
          <span className='date'>
            {currentPage && new Date(currentPage[0]?.date).toDateString()}
          </span>
          <ul>
            {currentPage &&
              currentPage.map(emos => <EmoState key={emos.id} emos={emos} />)}
          </ul>
        </>
      )}
    </div>
  );
}

export default EmoStatesList;
