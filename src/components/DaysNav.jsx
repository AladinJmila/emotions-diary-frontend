import './DaysNav.css';

function DaysNav({ paginated, currentPage, pageIndex, setPageIndex }) {
  const hasPrevPage = pageIndex < paginated.length - 1;
  const hasNextPage = pageIndex > 0;

  return (
    <div className='days-nav'>
      <button
        style={{ visibility: hasPrevPage ? 'visible' : 'hidden' }}
        onClick={() => {
          if (hasPrevPage) setPageIndex(pageIndex + 1);
        }}
      >
        <i className='fa fa-chevron-left' />
      </button>
      <span className='date'>
        {currentPage && new Date(currentPage[0]?.date).toDateString()}
      </span>
      <button
        style={{ visibility: hasNextPage ? 'visible' : 'hidden' }}
        onClick={() => {
          if (hasNextPage) setPageIndex(pageIndex - 1);
        }}
      >
        <i className='fa fa-chevron-right' />
      </button>
    </div>
  );
}

export default DaysNav;
