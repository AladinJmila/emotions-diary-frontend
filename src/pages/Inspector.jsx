import { useState, useEffect } from 'react';
import { useEmoStates } from '../hooks/useEmoStates';
import EmoStatesList from '../components/EmoStatesList';
import OneDayViz from '../components/OneDayViz';
import DaysNav from '../components/DaysNav';
import './Inspector.css';

const Inspector = () => {
  const [showEmotSate, setShowEmoState] = useState(true);
  const [showOneDatViz, setShwOneDayViz] = useState(false);
  const { emoStates, loadEmoStates } = useEmoStates();
  const [paginated, setPaginated] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
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
    <div className='inspector'>
      {paginated && (
        <DaysNav
          paginated={paginated}
          currentPage={currentPage}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
      {showEmotSate && (
        <EmoStatesList
          paginated={paginated}
          currentPage={currentPage}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
      {showOneDatViz && (
        <OneDayViz
          paginated={paginated}
          currentPage={currentPage}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
      <div className='buttons bottom'>
        <button
          onClick={() => {
            setShowEmoState(true);
            setShwOneDayViz(false);
          }}
        >
          List
        </button>
        <button
          onClick={() => {
            setShowEmoState(false);
            setShwOneDayViz(true);
          }}
        >
          Viz
        </button>
      </div>
    </div>
  );
};

export default Inspector;
