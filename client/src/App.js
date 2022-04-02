import * as React from 'react';
import { Routes, Route,  useNavigate, Navigate } from 'react-router-dom';

import './App.css';
import LoginPage from './components/LoginPage';
import StudentComponent from './components/StudentComponent';
import CoursesComponent from './components/CoursesComponent';
import PromotionComponent from './components/PromotionComponent';
import GroupComponent from './components/GroupComponent';
import AssignStudents from './components/AssignStudents';
import GradeComponent from './components/GradeComponent';
import DelibirationComponent from './components/DelibirationComponent';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { Button } from 'react-bootstrap';
import SignupPage from './components/SignupPage';

function App() {
  
  const [userInfo, setUserInfo] = React.useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  console.log(userInfo);
  //console.log(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)

  function PrivateRoute({ children }) {
    console.log(children[1].type.name)
    //return userInfo  ? children : <Navigate to="/login" /> 
    
      if (userInfo && userInfo.role==="Admin") {
        return children;
      } if (userInfo && userInfo.role==="Teacher" && ["GradeComponent", "Dashboard", "NotFound"].includes(children[1].type.name)){
          return children;
      } if (userInfo && userInfo.role==="Teacher" && !["GradeComponent", "Dashboard", "NotFound"].includes(children[1].type.name)) {
            return <Navigate to="/" />;
      } 
      return (<Navigate to="/login" />)
   }
  
  
  const go_To = useNavigate();
  
  const logOut = ( ) => {
    localStorage.removeItem('user');
    setUserInfo(null);
    go_To("/login");
   
  }
   

  
  return (
    
    <div >
      
        <h1>Hello</h1>
        {userInfo && <Button onClick={logOut}> logout </Button>}
        <Routes>
          <Route path='*' element={<PrivateRoute> <NotFound /> </PrivateRoute>} />
          <Route path='/' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path='/signup' element={<PrivateRoute> <SignupPage /> </PrivateRoute>} />
          <Route path='/login' element={userInfo ?  <Navigate to="/" /> : <LoginPage setUserInfo={setUserInfo} />} />
          <Route path='/students' element={<PrivateRoute> <StudentComponent /> </PrivateRoute>} />
          <Route path='/courses' element={<PrivateRoute> <CoursesComponent /> </PrivateRoute>} />
          <Route path='/promotions' element={<PrivateRoute> <PromotionComponent /> </PrivateRoute>} />
          <Route path='/promotions/:promoId' element={<PrivateRoute> <GroupComponent /> </PrivateRoute>} />
          <Route path='/promotions/:promoId/groups/:groupId' element={<PrivateRoute> <AssignStudents /> </PrivateRoute>} />
          <Route path='/grades' element={<PrivateRoute> <GradeComponent /> </PrivateRoute>} />
          <Route path='/deliberation' element={<PrivateRoute> <DelibirationComponent /> </PrivateRoute>} />
        </Routes>
        
    </div>
  );
}

export default App;
