import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import StudentComponent from './components/StudentComponent';
import ModulesComponent from './components/ModulesComponent';

function App() {
  
  return (
    
    <div >
      
        <h1>Hello</h1>
        <Routes>
          <Route path='/students' element={<StudentComponent />} />
          <Route path='/modules' element={<ModulesComponent />} />
        </Routes>
        
    </div>
  );
}

export default App;
