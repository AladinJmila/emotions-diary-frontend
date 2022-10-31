import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import GlobalState from './context/globalState';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Inspector from './pages/Inspector';

function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/editor' element={<Editor />} />
            <Route path='/inspector' element={<Inspector />} />
          </Routes>
        </div>
      </GlobalState>
    </BrowserRouter>
  );
}

export default App;
