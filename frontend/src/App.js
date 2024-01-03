import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './component/home/Home';
import Header from './component/layout/Header';
import FileInput from './component/file_select/FileInput';
import { tools } from './tools';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Fragment><Home /></Fragment>} />
        {
          tools && 
          tools.map((item, index) => (
            <Route key={index} exact path={`${item.to}`} element={<Fragment><FileInput title={item.title} desc={item.desc} accept={item.accept} select={item.select} format={item.format} /></Fragment>} />
          ))
        }
      </Routes>
    </Router>
  );
}

export default App;
