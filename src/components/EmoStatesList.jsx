import { useEffect, useState } from 'react';
import { useEmoStates } from '../hooks/useEmoStates';
import DaysNav from './DaysNav';
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
          <DaysNav
            paginated={paginated}
            currentPage={currentPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
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
