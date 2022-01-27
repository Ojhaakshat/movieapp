import './App.css';
import Navbar from './Components/Navbar';
import Poster from './Components/Poster';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={[<Poster/>, <Movies/>]}/>
        <Route path='/favourite' element={[<Favourite/>]}/>
      </Routes>
      {/* <Navbar/>
      <Poster/>
      <Movies/>
      <Favourite/> */}
    </Router>
  );
}

export default App;
