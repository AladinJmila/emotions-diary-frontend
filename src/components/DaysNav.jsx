import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './DaysNav.css';

library.add(faChevronLeft, faChevronRight);

function DaysNav({ paginated, currentPage, pageIndex, setPageIndex }) {
  return (
    <div className='days-nav'>
      <button
        onClick={() => {
          if (pageIndex < paginated.length - 1) setPageIndex(pageIndex + 1);
        }}
      >
        <FontAwesomeIcon icon='fa-solid fa-chevron-left' />
      </button>
      <span className='date'>
        {currentPage && new Date(currentPage[0]?.date).toDateString()}
      </span>
      <button
        onClick={() => {
          if (pageIndex > 0) setPageIndex(pageIndex - 1);
        }}
      >
        <FontAwesomeIcon icon='fa-solid fa-chevron-right' />
      </button>
    </div>
  );
}

export default DaysNav;
