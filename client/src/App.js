import { Routes, Route } from 'react-router-dom';
import './App.css';
import StudentComponent from './components/StudentComponent';
import ModulesComponent from './components/ModulesComponent';
import PromotionComponent from './components/PromotionComponent';
import GroupComponent from './components/GroupComponent';
import AssignStudents from './components/AssignStudents'

function App() {
  
  return (
    
    <div >
      
        <h1>Hello</h1>
        <Routes>
          <Route path='/students' element={<StudentComponent />} />
          <Route path='/modules' element={<ModulesComponent />} />
          <Route path='/promotions' element={<PromotionComponent />} />
          <Route path='/promotions/:promoId' element={<GroupComponent />} />
          <Route path='/promotions/:promoId/groups/:groupId' element={<AssignStudents />} />
        </Routes>
        
    </div>
  );
}

export default App;
