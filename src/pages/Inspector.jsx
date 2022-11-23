import { useState, useEffect } from 'react';
import { useEmoStates } from '../hooks/useEmoStates';
import EmoStatesList from '../components/EmoStatesList';
import OneDayViz from '../components/OneDayViz';
import OneMonthViz from '../components/OneMonthViz';
import DaysNav from '../components/DaysNav';
import './Inspector.css';

const Inspector = () => {
  const [showEmotSate, setShowEmoState] = useState(true);
  const [showOneDatViz, setShwOneDayViz] = useState(false);
  const { emoStates, loadEmoStates } = useEmoStates();
  const [paginated, setPaginated] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [monthPages, setMonthPages] = useState(null);

  useEffect(() => {
    !emoStates.length && loadEmoStates();
    if (emoStates.length) {
      setPaginated(dayPaginate());
      setCurrentPage(dayPaginate()[pageIndex]);
      setMonthPages(monthPaginate());
    }
  }, [emoStates, pageIndex]);

  function dayPaginate() {
    const paginated = [];
    let index = 0;

    for (let i = emoStates.length - 1; i >= 1; i--) {
      const current = emoStates[i];
      const prev = emoStates[i - 1];
      const currentDate = new Date(current.date);
      const prevDate = new Date(prev.date);

      if (!paginated[index]) paginated[index] = [];
      paginated[index].push(emoStates[i]);

      if (
        currentDate.getDate() === prevDate.getDate() &&
        currentDate.getMonth() === prevDate.getMonth() &&
        currentDate.getFullYear() === prevDate.getFullYear()
      ) {
        continue;
      } else {
        index++;
      }
    }

    return paginated;
  }

  function monthPaginate() {
    const paginated = [];
    let index = 0;
    const daysPages = dayPaginate();

    for (let i = daysPages.length - 1; i >= 1; i--) {
      const current = daysPages[i][0];
      const prev = daysPages[i - 1][0];
      const currentDate = new Date(current.date);
      const prevDate = new Date(prev.date);

      if (!paginated[index]) paginated[index] = [];
      paginated[index].push(daysPages[i]);

      if (
        currentDate.getMonth() === prevDate.getMonth() &&
        currentDate.getFullYear() === prevDate.getFullYear()
      ) {
        continue;
      } else {
        index++;
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
        <EmoStatesList paginated={paginated} currentPage={currentPage} />
      )}
      {/* {showOneDatViz && (
        <OneDayViz currentPage={currentPage} pageIndex={pageIndex} />
      )} */}
      {showOneDatViz && (
        <OneMonthViz currentPage={monthPages} pageIndex={pageIndex} />
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
