import './Ellipsis.css';

function Ellipsis() {
  return (
    <>
      {/* <i className='fa fa-ellipsis-v pointer'></i> */}
      <div className='ellipsis-menu'>
        <div className='ellipsis-menu-item'>
          <h6>Edit</h6>
          <i className='fa fa-pencil'></i>
        </div>
        <div className='ellipsis-menu-item'>
          <h6>Flag</h6>
          <i className='fa fa-flag'></i>
        </div>
        <div className='ellipsis-menu-item'>
          <h6>Delete</h6>
          <i className='fa fa-trash-o'></i>
        </div>
      </div>
    </>
  );
}

export default Ellipsis;
