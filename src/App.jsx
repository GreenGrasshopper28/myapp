import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Video from './Pages/Videos/Video'

const App = () => {
  const [sidebar, setSidebar] = React.useState(true);
  return (
    <div>
      <Navbar setSidebar = {setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='video/:categoryId/:videoId' element={<Video/>}/>
        </Routes>
    </div>
  );
};

export default App;
