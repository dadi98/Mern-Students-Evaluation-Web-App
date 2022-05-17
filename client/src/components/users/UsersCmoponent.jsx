import * as React from 'react';
import axios from 'axios';

import { Row, Col, Container, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

import AddUser from './AddUser';
import DeleteUser from './DeleteUser'

export default function UserComponent () {

  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState();
  console.log(users);

  const [addModal, setAddModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  //const [deleteAllModal, setDeleteAllModal] = React.useState(false);
  //const [editModal, setEditModal] = React.useState(false);
  const [id, setId] = React.useState();
  
  const [refresh, setRefresh] = React.useState(false);

  const [q, setQ] = React.useState('');
  const [searchParam] = React.useState(["firstname", "lastname", "username", "role"]);
  
  // console.log(users);
  React.useEffect(() => {
    const getUsers = async() => {
      try {
        const { data } = await axios.get('http://localhost:3000/users');
        setUsers(data);
        console.log(data);
          return data;
      } catch (err) {
        if(err instanceof Error){
          setError(err.message);
          //console.log(error)
          return err.message;
        }
      }
    }
    
    getUsers();
    //getStudents().then(value => (typeof value === "string") ? 
    //setError(value) : (typeof value === "student[]") ? setusers(value) : setError(value))
  }, [refresh, addModal, error]);

  const Search = (items) => {
    return items.filter(item => 
                        searchParam.some(param => 
                                         item[param].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
  }

  return (
    <>
      <div className=''>
        <Container fluid className='inputs-container bg-white ' >
          <Row className="inputs-row">
            <Col md={2} className=''>
              <Button variant=""
                      onClick={() => setAddModal(true)} 
                      className='inputs-button button-primary'>Add user</Button>
            </Col>
            <Col md={2} className=''>
              <Button variant=""
                       onClick={() => setRefresh(!refresh)}
                       className='inputs-button button-secondary' >Refresh</Button>
            </Col>
            {/*<Col md={3} >
              <Button variant="primary"
                      onClick={() => setDeleteAllModal(true)} 
                      className='inputs-button'>Delete All</Button>
            </Col>*/}
            <Col md={5} className='ms-auto'>
              <Form.Control type="search" placeholder="find users..."
                            value={q} className='inputs-button'
                             onChange={(e) => setQ(e.target.value)}/>
            </Col>
          </Row>
        </Container>
        <div className='tables' >
        {users.length !== 0 && Search(users).length !== 0 ?
        
        (
          <table className="table table-striped table-hover student-table" >
          
          <thead>
            <tr>
              <th>Actions</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {Search(users).map(item => (
              <tr key={item._id} >
                <td>
                    <FontAwesomeIcon onClick={() => {setId(item._id); setDeleteModal(true);}} 
                                     icon={faTrashCan} 
                                     className='trash-icon' />
                </td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.username}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (<h2 className='d-flex justify-content-center p-4' >No Users To Show !</h2>)}
        </div>
        <div>
        
        

        {addModal && <AddUser show={addModal} onHide={() => setAddModal(false)}/>}
        {deleteModal && <DeleteUser show={deleteModal} onHide={() => setDeleteModal(false)} id={id}/>}
        {/*{deleteAllModal && <DeleteAll show={deleteAllModal} onHide={() => setDeleteAllModal(false)}/>}
        {editModal && <EditStudent show={editModal} onHide={() => setEditModal(false)} data={users} id={id}/>}*/}
        </div>
      </div>
    </>
  );
}



