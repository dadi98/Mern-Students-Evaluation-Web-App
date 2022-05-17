import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import './App.css';
import LoginPage from './components/LoginPage';
import StudentComponent from './components/students/StudentComponent';
import CoursesComponent from './components/CoursesComponent';
import PromotionComponent from './components/promotions/PromotionComponent';
import GroupComponent from './components/GroupComponent';
import AssignStudents from './components/AssignStudents';
import GradeComponent from './components/GradeComponent';
import DelibirationComponent from './components/DelibirationComponent';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar'
import SideDialog from './components/SideDialog';
import UsersComponent from './components/users/UsersCmoponent';

function App() {
  
  const [userInfo, setUserInfo] = React.useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [open, setOpen] = React.useState(false);
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

  
  return (
    <>
    {/*className='vh-100'
    className='d-flex justify-content-center bg-secondary h-100'*/}
    <Container fluid >
        <Row style={{/*backgroundColor: "red",height: '93%'*/}}
              className='bg-secondary'>
          {userInfo &&
              <>
                <Col md={12} className='sticky-top px-0 shadow'>
                  <NavBar user={userInfo} 
                          setUserNull={() => setUserInfo(null)}
                          open={open}
                          setOpen={() => setOpen(!open)} />
                          
                </Col>
                <Col md={3} lg={2} className='sidebar' >
                  <SideDialog user={userInfo} open={open}
                              setOpen={() => setOpen(false)}/>
                </Col>
              </>}
          
          <Col md={userInfo ? 9 : 12} lg={userInfo ? 10 : 12}
                className={userInfo ? 'main-section  py-4  ms-auto'
                          : 'vh-100 login'}
                  style={{/*backgroundColor: "red",*/}}>
            <Routes>
              <Route path='/login' element={userInfo ?  <Navigate to="/" /> : <LoginPage setUserInfo={setUserInfo} />} />
              <Route path='*' element={<PrivateRoute> <NotFound /> </PrivateRoute>} />
              <Route path='/' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
              <Route path='/signup' element={<PrivateRoute> <UsersComponent /> </PrivateRoute>} />
              <Route path='/students' element={<PrivateRoute> <StudentComponent /> </PrivateRoute>} />
              <Route path='/courses' element={<PrivateRoute> <CoursesComponent /> </PrivateRoute>} />
              <Route path='/promotions' element={<PrivateRoute> <PromotionComponent /> </PrivateRoute>} />
              <Route path='/promotions/:promoId' element={<PrivateRoute> <GroupComponent /> </PrivateRoute>} />
              <Route path='/promotions/:promoId/groups/:groupId' element={<PrivateRoute> <AssignStudents /> </PrivateRoute>} />
              <Route path='/grades' element={<PrivateRoute> <GradeComponent /> </PrivateRoute>} />
              <Route path='/deliberation' element={<PrivateRoute> <DelibirationComponent /> </PrivateRoute>} />
            </Routes>
          </Col>
        </Row>
    </Container>
    </>
  );
}

export default App;
