import * as React from 'react';
import axios from 'axios';

import { Row, Col, Button, Form, Table, DropdownButton, Dropdown } from 'react-bootstrap';

import { Student } from './interfaces';

import AddStudent from './AddStudent';
import DeleteStudent from './DeleteStudent';
import EditStudent from './EditStudent';
import DeleteAll from './DeleteAll';

export default function StudentComponent () {

  const [rows, setRows] = React.useState<Array<Student>>([]);
  const [error, setError] = React.useState<string>();

  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [deleteAllModal, setDeleteAllModal] = React.useState<boolean>(false);
  const [editModal, setEditModal] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>();
  
  const [refresh, setRefresh] = React.useState<boolean>(false);

  const [q, setQ] = React.useState<string>('');
  const [searchParam] = React.useState<Array<string>>(["studentId", "firstName", "lastName", "level", "registrationStatus"]);
  
  // console.log(rows);
  React.useEffect(() => {
    const getStudents = async(): Promise<Array<Student> | string | undefined> => {
      try {
        const { data } = await axios.get('http://localhost:3000/students');
        setRows(data);
        //console.log(data);
          return data;
      } catch (err) {
        if(err instanceof Error){
          setError(err.message);
          return err.message;
        }
      }
    }
    
    getStudents();
    //getStudents().then(value => (typeof value === "string") ? 
    //setError(value) : (typeof value === "student[]") ? setRows(value) : setError(value))
  }, [refresh, addModal, deleteModal, deleteAllModal, editModal]);

  const Search = (items: Student[]) => {
    return items.filter(item => 
                        searchParam.some(param => 
                                         item[param].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
  }

  return (
    <>
      <div>
        <Form.Group className="mb-3" controlId="search-field">
          <Row>
            <Col lg={1}>
              <Form.Label> Find a student:</Form.Label>
            </Col>
            <Col lg={3}>
              <Form.Control type="search" placeholder="search for a student" value={q}
                                    onChange={(e) => setQ((e.target as typeof e.target).value)}/>
            </Col>
          </Row>
        </Form.Group>
        {rows.length !== 0 && Search(rows).length !== 0 ?
        (<Table className="all" striped bordered hover responsive>
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
        </Table>) : (<h2>no Students to show</h2>)}
      </div>
      <div>
        <Button variant="primary" onClick={() => setAddModal(true)} >Add student</Button>
        <Button variant="secondary" onClick={() => setRefresh(!refresh)} >Refresh</Button>
        <Button variant="primary" onClick={() => setDeleteAllModal(true)} >Delete All</Button>

        {addModal && <AddStudent show={addModal} onHide={() => setAddModal(false)}/>}
        {deleteModal && <DeleteStudent show={deleteModal} onHide={() => setDeleteModal(false)} id={id}/>}
        {deleteAllModal && <DeleteAll show={deleteAllModal} onHide={() => setDeleteAllModal(false)}/>}
        {editModal && <EditStudent show={editModal} onHide={() => setEditModal(false)} data={rows} id={id}/>}
      </div>
    </>
  );
}



