import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const user = false;

  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <Link to='/'>
            <img src='./emo-logo.png' alt='logo' />
            <span>logo</span>
          </Link>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
            <li>
              <NavLink to='/signup'>Signup</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to='/profile'>Profile</NavLink>
            </li>
            <li>
              <NavLink to='/logout'>Logout</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
