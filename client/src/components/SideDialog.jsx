import * as React from 'react';
import { Routes, Route,  useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Container, ListGroup, Nav, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faHouse } from '@fontawesome/free-solid-svg-icons'

//import { f } from '@fortawesome/free-regular-svg-icons'
import { faHouse, faGraduationCap, faPeopleGroup, faBookOpenReader, faPenClip, faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons'


export default function SideDialog({user, open, setOpen}){
    
    const location = useLocation();
    console.log(location.pathname);
    const navigate = useNavigate();

    return (
        <>  
            <Collapse in={open} className='d-md-block sidebar-collapse'>
            <div  className='' >
            {user.role==='Admin' ?
                (<Nav id='sidebar' avtiveKey='dash' className="flex-column " 
                      onSelect={() => setOpen()}>
                    <Nav.Link className={location.pathname=='/' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey=''  
                              onClick={() => navigate('/')} >
                        <FontAwesomeIcon icon={faHouse} /> <span>Home</span>  </Nav.Link>
                    <Nav.Link className={location.pathname=='/students' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey=''
                             onClick={() => navigate('/students')} >
                        <FontAwesomeIcon icon={faGraduationCap} /> <span>Students</span> </Nav.Link>
                    <Nav.Link className={location.pathname=='/promotions' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey=''
                             onClick={() => navigate('/promotions')} >
                        <FontAwesomeIcon icon={faPeopleGroup} /> <span>Promotions</span> </Nav.Link>
                    <Nav.Link className={location.pathname=='/courses' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey=''
                             onClick={() => navigate('/courses')} >
                        <FontAwesomeIcon icon={faBookOpenReader} />  <span>Courses</span> </Nav.Link>
                    <Nav.Link className={location.pathname=='/grades' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey=''
                             onClick={() => navigate('/grades')} >
                        <FontAwesomeIcon icon={faPenClip} /> <span>Evaluation</span>  </Nav.Link>
                    <Nav.Link className={location.pathname=='/deliberation' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey='' 
                             onClick={() => navigate('/deliberation')} >
                        <FontAwesomeIcon icon={faSquarePollHorizontal} /> <span>Deliberation</span>  </Nav.Link>
                    <Nav.Link className={location.pathname=='/signup' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey=''
                             onClick={() => navigate('/signup')} >
                        <FontAwesomeIcon icon={faPeopleGroup} /> <span>Users</span>  </Nav.Link>
                </Nav>)     :
                (<Nav id='sidebar' className="flex-column ">
                    <Nav.Link className={location.pathname=='/' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey=''
                             onClick={() => navigate('/')} >
                        <FontAwesomeIcon icon={faHouse} /> <span>Home</span> </Nav.Link>
                    <Nav.Link className={location.pathname=='/grades' ?  "Nav-Link Link-active" : "Nav-Link"} eventKey=''
                             onClick={() => navigate('/grades')} >
                        <FontAwesomeIcon icon={faPenClip} /> <span>Evaluation</span> </Nav.Link>
                </Nav>)
            }
            </div>
            </Collapse>
        </>
    )
}