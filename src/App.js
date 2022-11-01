import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import GlobalState from './context/globalState';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Inspector from './pages/Inspector';
import Category from './pages/Category';

function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/inspector' element={<Inspector />} />
            <Route path='/categories/:id' element={<Category />} />
          </Routes>
        </div>
      </GlobalState>
    </BrowserRouter>
  );
}

export default App;
