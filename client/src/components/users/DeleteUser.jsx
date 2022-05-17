import * as React from 'react';
import axios from 'axios';
import { Modal, Button} from 'react-bootstrap';


const DeleteStudent = ({show, onHide, id}) => {
  
    const deleteUser = async(e) => {
      //const id = window.location.hash.substring(1);
      console.log(id);
      e.preventDefault();
      try {
        await axios.delete(`http://localhost:3000/users/${id}`)
  
      } catch (err) {
        if(err instanceof Error){
          console.log(err.message);
        }
      }
    }
    //console.log(20);
    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove a user!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove this user ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => {deleteUser(e); onHide();}}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

export default DeleteStudent;