import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import StudentComponent from './components/StudentComponent';

function App() {
  return (
    <div >
      
        <h1>Hello</h1>
        <Routes>
          {/**/}<Route path='/Students' element={<StudentComponent />} />
        </Routes>
        
    </div>
  );
}

export default App;
