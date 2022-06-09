import * as React from 'react';
import { Routes, Route,  useNavigate } from 'react-router-dom';
import { Row, Col, Container, Navbar, NavDropdown, Nav, Button } from 'react-bootstrap';

export default function NavBar({user, setUserNull, open, setOpen}){

    const go_To = useNavigate();

    const logOut = () => {
        localStorage.removeItem('user');
        setUserNull();
        go_To("/login");
    }
    /*<div>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </div>*/

    return (
        <>  
            <Navbar className='Navbar'>
                <Navbar.Brand onClick={() => go_To("/")} className='text-white px-4' >EvaluaTe</Navbar.Brand>
                {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                <div className="Nav me-5 ms-auto" >
                <Nav >
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="collapse-sidebar"
                        aria-expanded={open}
                        className='d-md-none bg-info mx-4'
                    >
                        <span className="navbar-toggler-icon ms-auto"></span>
                    </Button>
                    <Button
                        onClick={logOut}
                        className=''
                    >
                       Log out   
                    </Button>
                    
                </Nav>
                </div>
            </Navbar>
            
        </>
    )
}