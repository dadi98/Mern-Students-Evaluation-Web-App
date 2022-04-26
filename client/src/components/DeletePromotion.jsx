import * as React from 'react';
import axios from 'axios';
import { Modal, Button} from 'react-bootstrap';


const DeletePromotion = ({show, onHide, id}) => {
  
    const deletePromotion = async(e) => {
      //const id = window.location.hash.substring(1);
      console.log(id);
      e.preventDefault();
      try {
        await axios.delete(`http://localhost:3000/promotions/${id}`)
  
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
            <Modal.Title>Delete a promotion!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this promotion ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => {deletePromotion(e); onHide();}}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

export default DeletePromotion;