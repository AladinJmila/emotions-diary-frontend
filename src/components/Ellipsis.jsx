import { useState, useRef, useEffect } from 'react';
import './Ellipsis.css';

function Ellipsis({ item }) {
  const [showMenu, setShowMenu] = useState(false);
  const ellipsis = useRef();
  const menu = useRef();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        menu.current &&
        !menu.current.contains(e.target) &&
        !ellipsis.current.contains(e.target)
      ) {
        setShowMenu(false);
        console.log('outside');
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menu]);

  return (
    <div ref={ellipsis} className='ellipsis'>
      <i
        onClick={() => setShowMenu(!showMenu)}
        className='fa fa-ellipsis-v pointer'
      ></i>
      {showMenu && (
        <div ref={menu} className='ellipsis-menu'>
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
      )}
    </div>
  );
}

export default Ellipsis;
