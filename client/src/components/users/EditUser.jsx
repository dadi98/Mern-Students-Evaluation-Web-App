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
        if(!password) {
          await axios.put(`http://localhost:3000/users/${id}`, {firstname, lastname, username, role})
        } else {
          await axios.put(`http://localhost:3000/users/${id}`, {firstname, lastname, username, password, role})
        } 

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
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="first name" value={firstname}
                                    onChange={e => setFirstname(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>last Name</Form.Label>
                      <Form.Control type="text" placeholder="last name" value={lastname}
                                    onChange={e => setLastname(e.target.value)}/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" placeholder="username" value={username}
                                    onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>New Password </Form.Label>
                      <Form.Control type="password" placeholder="new password" value={numberOfGroups}
                                    onChange={e => setPassword(e.target.value)}/>
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