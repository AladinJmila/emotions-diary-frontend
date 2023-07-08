import './Visualtization.css';

const Visualization = () => {
  return (
    <div className='viz-container'>
      <div className='viz-menu'>
        <button>Daily</button>
        <button>Weekly</button>
        <button>Monthly</button>
      </div>
      <div className='visualization'>
        <h2>Visualization</h2>
        <div className='viz-body'></div>
      </div>
    </div>
  );
};

export default Visualization;
