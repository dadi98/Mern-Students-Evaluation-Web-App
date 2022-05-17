import * as React from 'react';
import axios from "axios";
import {Container, Row, Col, Button, Form, Card, Alert } from 'react-bootstrap';
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
                setError('Wrong Username or Password!');
            }
        }

    }
    
    return (
    <>
        <Container className="h-100 d-flex justify-content-center
                             align-items-center" >
            <Row  className="w-50 h-50 ">
                <Col md={9} className='mx-auto login-col rounded-3 '>
                    
                    <Form onSubmit={handleLogin} className='d-flex flex-column h-100'>
                        <h4 className='align-self-center p-4'>Login To Continue</h4>
                        <Form.Group  className="mb-3" >
                            <Form.Label className='cred-label'>Username : </Form.Label>
                            <Form.Control type="text" placeholder="enter username..." value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onClick={(e) => setError('')}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password : </Form.Label>
                            <Form.Control type="password" placeholder="enter password..." value={password} 
                                        onChange={e => setPassword(e.target.value)}
                                        onClick={(e) => setError('')}/>
                        </Form.Group>
                        {error &&
                        <Alert variant="danger">
                            <Alert.Heading as="h4" className=''>{error}</Alert.Heading>
                        </Alert>
                        }
                    
                        <Button  type="submit" className='d-block mt-auto mb-3 login' > 
                            LOG IN 
                        </Button>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
    );
}

 