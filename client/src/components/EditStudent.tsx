import * as React from 'react';
import axios from 'axios';
import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Student, modal } from './interfaces';

const EditStudent = ({show, onHide, data, id}: modal): JSX.Element => {
  
    let student: Student = data!.filter((item => item._id === id))[0];
  
    //console.log(data!.filter((item => item._id === hash))[0]);
      
    const [studentId, setStudentId] = React.useState<string>(student.studentId);
    const [firstName, setFirstName] = React.useState<string>(student.firstName);
    const [lastName, setLastName] = React.useState<string>(student.lastName);
    const [sex, setSex] = React.useState<string>(student.sex);
    const [birthDate, setBirthDate] = React.useState<string>(student.birthDate);
    const [birthPlace, setBirthPlace] = React.useState<string>(student.birthPlace);
    const [degree, setDegree] = React.useState<string>(student.degree);
    const [level, setLevel] = React.useState<string>(student.level);
    const [registrationStatus, setRegistrationStatus] = React.useState<string>(student.registrationStatus);
    
    const editStudent = async(e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:3000/students/${id}`, {studentId, firstName, lastName, sex, birthDate,
                                                                 birthPlace, degree, level, registrationStatus})
  
      } catch (err) {
        if(err instanceof Error){
          console.log(err.message);
        }
      } 
    }
  
    return (
      <div>
        <Modal size={'lg'} show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
          <Form onSubmit={(e: React.SyntheticEvent) => {editStudent(e); onHide();}}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit student
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
                      <Form.Select onChange={(e) => setSex((e.target as typeof e.target).value)} value={sex} aria-label="sex select">
                            
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
                      <Form.Select onChange={(e) => setDegree((e.target as typeof e.target).value)} value={degree} aria-label="degree select">
                            
                            <option value="Licence" >Licence</option>
                            <option value="Master" >Master</option>
                            
                        </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Promotion</Form.Label>
                      <Form.Select onChange={(e) => setLevel((e.target as typeof e.target).value)} value={level} aria-label="promotion select">
                            
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
              <Button type="submit" >edit</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    )
  }

export default EditStudent;