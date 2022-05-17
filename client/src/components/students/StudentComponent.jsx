import * as React from 'react';
import axios from 'axios';

import { Row, Col, Container, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';

import AddStudent from './AddStudent';
import DeleteStudent from './DeleteStudent';
import EditStudent from './EditStudent';
import DeleteAll from './DeleteAll';

export default function StudentComponent () {

  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState();

  const [addModal, setAddModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [deleteAllModal, setDeleteAllModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [id, setId] = React.useState();
  
  const [refresh, setRefresh] = React.useState(false);

  const [q, setQ] = React.useState('');
  const [searchParam] = React.useState(["studentId", "firstName", "lastName", "level", "registrationStatus"]);
  
  // console.log(rows);
  React.useEffect(() => {
    const getStudents = async() => {
      try {
        const { data } = await axios.get('http://localhost:3000/students');
        const studs = data.filter(item => item.level==="L1").map(item => item._id);
        console.log(studs);
        setRows(data);
        //console.log(data);
          return data;
      } catch (err) {
        if(err instanceof Error){
          setError(err.message);
          console.log(error)
          return err.message;
        }
      }
    }
    
    getStudents();
    //getStudents().then(value => (typeof value === "string") ? 
    //setError(value) : (typeof value === "student[]") ? setRows(value) : setError(value))
  }, [refresh, addModal, deleteModal, deleteAllModal, editModal, error]);

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
                      className='inputs-button button-primary'>Add student</Button>
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
              <Form.Control type="search" placeholder="Search..."
                            value={q} className='inputs-button'
                             onChange={(e) => setQ(e.target.value)}/>
            </Col>
          </Row>
        </Container>
        <div className='tables' >
        {rows.length !== 0 && Search(rows).length !== 0 ?
        
        (
          <table className="table table-striped table-hover student-table" >
          
          <thead>
            <tr>
              <th>actions</th>
              <th>Student ID</th>
              <th>first Name</th>
              <th>Last Name</th>
              <th>Sex</th>
              <th>Birth Date</th>
              <th>Birth Place</th>
              <th>Degree</th>
              <th>Level</th>
              <th>Registration status</th>
            </tr>
          </thead>
          <tbody>
            {Search(rows).map(item => (
              <tr key={item._id} >
                <td>
                    <DropdownButton size="sm" id="dropdown-basic-button" title="">
                      <Dropdown.Item  onClick={() => {setId(item._id); setEditModal(true);}} >  Edit</Dropdown.Item>
                      <Dropdown.Item  onClick={() => {setId(item._id); setDeleteModal(true);}} >  Delete</Dropdown.Item>
                    </DropdownButton>
                </td>
                <td>{item.studentId}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.sex}</td>
                <td>{item.birthDate}</td>
                <td>{item.birthPlace}</td>
                <td>{item.degree}</td>
                <td>{item.level}</td>
                <td>{item.registrationStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (<h2 className='d-flex justify-content-center p-4' >No Students To Show !</h2>)}
        </div>
      <div>
        
        

        {addModal && <AddStudent show={addModal} onHide={() => setAddModal(false)}/>}
        {deleteModal && <DeleteStudent show={deleteModal} onHide={() => setDeleteModal(false)} id={id}/>}
        {/*deleteAllModal && <DeleteAll show={deleteAllModal} onHide={() => setDeleteAllModal(false)}/>*/}
        {editModal && <EditStudent show={editModal} onHide={() => setEditModal(false)} data={rows} id={id}/>}
      </div>
      </div>
    </>
  );
}



