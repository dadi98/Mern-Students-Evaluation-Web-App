import * as React from 'react';
import axios from 'axios';
import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { modal } from './interfaces';

const AddStudent = ({show, onHide}: modal): JSX.Element => {

    const [studentId, setStudentId] = React.useState<string>('');
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [sex, setSex] = React.useState<string>('');
    const [birthDate, setBirthDate] = React.useState<string>('');
    const [birthPlace, setBirthPlace] = React.useState<string>('');
    const [degree, setDegree] = React.useState<string>('');
    const [level, setLevel] = React.useState<string>('');
    const [registrationStatus, setRegistrationStatus] = React.useState<string>('');
    //console.log(10);
    const addStudent = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
        await axios.post('http://localhost:3000/students', {studentId ,firstName ,lastName ,sex ,birthDate ,
                                                            birthPlace ,degree ,level ,registrationStatus })
        } catch (err) {
            if(err instanceof Error){
                console.log(err.message);
                console.log(err.message);
            }
        }
    }
    //console.log(11);
    return (
        <div>
        <Modal size={'lg'} show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
            <Form onSubmit={(e: React.SyntheticEvent) => {addStudent(e); onHide();}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add student
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type="text" placeholder="Student ID" value={studentId}
                                        onChange={(e) => setStudentId((e.target as typeof e.target).value)}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" value={firstName}
                                        onChange={(e) => setFirstName((e.target as typeof e.target).value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" value={lastName} 
                                    onChange={(e) => setLastName((e.target as typeof e.target).value)}/>
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Sex</Form.Label>
                        <Form.Select onChange={(e) => setSex((e.target as typeof e.target).value)} aria-label="sex select">
                            <option >choose..</option>
                            <option value="male" >Male</option>
                            <option value="female" >Female</option>
                            
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Birth date</Form.Label>
                        <Form.Control type="date" value={birthDate} 
                                    onChange={(e) => setBirthDate((e.target as typeof e.target).value)}/>
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Birth place</Form.Label>
                        <Form.Control type="text" placeholder="Birth place" value={birthPlace} 
                                    onChange={(e) => setBirthPlace((e.target as typeof e.target).value)}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Degree</Form.Label>
                        <Form.Select onChange={(e) => setDegree((e.target as typeof e.target).value)} aria-label="degree select">
                            <option >choose..</option>
                            <option value="Licence" >Licence</option>
                            <option value="Master" >Master</option>
                            
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Promotion</Form.Label>
                        <Form.Select onChange={(e) => setLevel((e.target as typeof e.target).value)} aria-label="promotion select">
                            <option >choose..</option>
                            <option value="L1" >L1</option>
                            <option value="L2" >L2</option>
                            <option value="L3" >L3</option>
                            <option value="M1" >M1</option>
                            <option value="M2" >M2</option>
                            
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Registration status</Form.Label>
                        <Form.Control type="text" placeholder="Registration status" value={registrationStatus} 
                                    onChange={(e) => setRegistrationStatus((e.target as typeof e.target).value)}/>
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

export default AddStudent;