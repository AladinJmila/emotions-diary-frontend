import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='navbar' onClick={() => navigate('/')}>
      Navbar
    </div>
  );
};

export default Navbar;
