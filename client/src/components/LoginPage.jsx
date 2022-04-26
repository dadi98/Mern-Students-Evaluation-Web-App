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
        <div className="login" >
            <Card  className="login-card">
                <Form onSubmit={handleLogin}>
                <Card.Header as="h5" className="text-center" style={{backgroundColor: "#ededed", color: "#232d5e"}}>Login To Continue</Card.Header>
                <Card.Body>
                   
                             
                         <Form.Group className="mb-3" >
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
                            <Alert.Heading as="h5" className='d-flex justify-content-center'>{error}</Alert.Heading>
                        </Alert>
                        }
                </Card.Body>
                <Card.Footer style={{backgroundColor: "#ededed"}}><Button style={{backgroundColor: "#232d5e", color: "#fafafa"}}
                             type="submit" className='login-button' >
                                     LOG IN </Button>
                </Card.Footer>
                </Form>
            </Card>
        </div>    
       
    </>
    );
}

 