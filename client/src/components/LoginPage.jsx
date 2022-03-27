import * as React from 'react';
import axios from "axios";
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({setUserInfo}) {
    
    
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    //console.log(coursesByPromo)
    const Navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/users/login', {username, password})
            //console.log(data)
            if(data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                setUserInfo(data.user);
                Navigate('/');

            } 
        } catch (err) {
            console.log(err.response.status);
            if (err.response.status='401') {
                setError('wrong username or password');
            }
        }

    }
    
    return (
    <>
        <Form onSubmit={handleLogin}>
            {error && (<h4>{error}</h4>)}
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Username : </Form.Label>
                            <Form.Control type="text" placeholder="enter username..." value={username}
                                        onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Password : </Form.Label>
                        <Form.Control type="password" placeholder="enter password..." value={password} 
                                    onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Button type="submit" > Login </Button>
                    </Col>
                </Row>            
            </Container>
        </Form>
    </>
    );
}

 