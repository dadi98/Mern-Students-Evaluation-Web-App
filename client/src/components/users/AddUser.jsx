import * as React from 'react';
import axios from 'axios';
import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';

const AddUser = ({show, onHide}) => {

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
            /*if(data.success) {
                alert(data.status);
            } */
        } catch (error) {
            setError(error.message);
        }

    }

    return (
        <div>
        <Modal size={'lg'} show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
            <Form onSubmit={e => {handleSignup(e); onHide();}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>First name : </Form.Label>
                            <Form.Control type="text" placeholder="enter firstname..." value={user.firstname}
                                        onChange={e => setUser(state => ({...state, firstname: e.target.value}))}/>
                        </Form.Group>
                    </Col>
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
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password : </Form.Label>
                            <Form.Control type="password" placeholder="enter password..." value={user.password} 
                                        onChange={e => setUser(state => ({...state, password: e.target.value}))}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
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
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} >Close</Button>
                <Button type="submit" >Add</Button>
            </Modal.Footer>
            </Form>
        </Modal>
        </div>
    )
}

export default AddUser;