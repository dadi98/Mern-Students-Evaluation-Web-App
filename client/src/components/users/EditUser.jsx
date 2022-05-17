import * as React from 'react';
import axios from 'axios';
import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';

const EditUser = ({show, onHide, data, id}) => {
  
    let user = data.filter((item => item._id === id))[0];
  
    //console.log(data!.filter((item => item._id === hash))[0]);
      
    const [firstname, setFirstname] = React.useState(promotion.firstname);
    const [lastname, setLastname] = React.useState(promotion.lastname);
    const [username, setUsername] = React.useState(promotion.username);
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState(promotion.role);
    
    const editUser = async(e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:3000/promotions/${id}`, {firstname, lastname, username, password, role})
  
      } catch (err) {
        if(err instanceof Error){
          console.log(err.message);
        }
      } 
    }
  
    return (
      <div>
        <Modal size={'lg'} show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
          <Form onSubmit={e => {editUser(e); onHide();}}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit promotion
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
              <Container>
              <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Academic year</Form.Label>
                      <Form.Control type="text" placeholder="Academic year" value={year}
                                    onChange={e => setYear(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Degree</Form.Label>
                      <Form.Select  value={degree} onChange={e => setDegree(e.target.value)} 
                                    aria-label="degree select">
                                <option >choose..</option> 
                                <option value="License" >License</option>
                                <option value="Master" >Master</option> 
                            </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Major</Form.Label>
                      <Form.Select  value={major} onChange={e => setMajor(e.target.value)} 
                                    aria-label="major select">
                                <option >choose..</option>
                                <option value="L1" >L1</option>
                                <option value="L2" >L2</option>
                                <option value="L3" >L3</option>
                                <option value="M1" >M1</option>
                                <option value="M2" >M2</option>
                            </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Number of Groups</Form.Label>
                      <Form.Control type="text" placeholder="num of groups" value={numberOfGroups}
                                    onChange={e => setNumberOfGroups(e.target.value)}/>
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

export default EditUser;