import * as React from 'react';
import axios from "axios";
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    
    const [user, setUser] = React.useState({firstname: '', lastname: '', username: '', password: '', role: 'Teacher'});
    const [error, setError] = React.useState('');
    //const [students, setStudents] = React.useState([]);
    //const [studentsByPromo, setStudentsByPromo] = React.useState([]);
    //const inpRef = React.useRef({});
    //console.log(coursesByPromo)
    //const Navigate = useNavigate()

    const handleSignup = async(e) => {
        e.preventDefault();
        console.log(user);
        try {
            const { data } = await axios.post('http://localhost:3000/users/signup', user)
            //console.log(data)
            if(data.success) {
                alert(data.status);
            } 
        } catch (err) {
            setError(err.message);
        }

    }
    
    return (
    <>
        <Form onSubmit={handleSignup}>
            {error && (<h4>{error}</h4>)}
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>First name : </Form.Label>
                            <Form.Control type="text" placeholder="enter firstname..." value={user.firstname}
                                        onChange={e => setUser(state => ({...state, firstname: e.target.value}))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Last name : </Form.Label>
                        <Form.Control type="text" placeholder="enter lastname..." value={user.lastname} 
                                    onChange={e => setUser(state => ({...state, lastname: e.target.value}))}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Username : </Form.Label>
                            <Form.Control type="text" placeholder="enter username..." value={user.username}
                                        onChange={e => setUser(state => ({...state, username: e.target.value}))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Password : </Form.Label>
                        <Form.Control type="password" placeholder="enter password..." value={user.password} 
                                    onChange={e => setUser(state => ({...state, password: e.target.value}))}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Col xs={12} md={3}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Role : </Form.Label>
                        <Form.Select  value={user.role}
                                      onChange={e => setUser(state => ({...state, role: e.target.value}))} 
                                      aria-label="role select">
                            <option value="Teacher">teacher</option>
                            <option value="Admin">admin</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Button type="submit" > Signup </Button>
                    </Col>
                </Row>            
            </Container>
        </Form>
    </>
    );
}

 