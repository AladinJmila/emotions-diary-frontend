import React from 'react';
import './Home.css';

const Home = () => {
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
      </div>
    </div>
  );
};

export default Home;
