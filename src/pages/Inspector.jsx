import React from 'react';
import EmoStatesList from '../components/EmoStatesList';
import OneDayViz from '../components/OneDayViz';
import './Inspector.css';

const Inspector = () => {
  return (
    <div className='inspector'>
      {/* <EmoStatesList /> */}
      <OneDayViz />
    </div>
  );
};

export default Inspector;
