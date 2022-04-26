import * as React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
//imrse, ffc, sfc
import { Row, Col, Button, Form, ListGroup, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export default function AssignStudents ({promoId, groupId}) {
  
  const [promotion, setPromotion] = React.useState({});
  const [group, setGroup] = React.useState({/*groupNumber: '', students: []*/});
  const [students, setStudents] = React.useState([]);
  //console.log(promotion);
  const [refresh, setRefresh] = React.useState(false);
  const [error, setError] = React.useState('');
  const inputRef = React.useRef([]);
  /*const [q, setQ] = React.useState('');
  const [searchParam] = React.useState(["name"]);*/
  //const { promoId, groupId } = useParams();
  //let navigate = useNavigate();

  React.useEffect(() => {
    const getGroup = async() => {
      try {
        
        const promotionData = await axios.get(`http://localhost:3000/promotions/${promoId}`);
        setPromotion(promotionData.data);
        setGroup(promotionData.data.groups.filter(group => group._id === groupId)[0]);
        const studentsData = await axios.get(`http://localhost:3000/students?level=${promotionData.data.major}`);
        setStudents(studentsData.data);
        //console.log(studentsData)
        //console.log(data);
      } catch (err) {
        if(err instanceof Error){
          setError(err.message); 
          console.log(error);
        }
      }
    }
    getGroup();
  }, [error, groupId, promoId, refresh]);

  /*const Search = (items) => {
    return items.filter(item => 
                        searchParam.some(param => 
                                         item[param].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
  }*/
  
  const addStudents = async(e) => {
    e.preventDefault();
    const groupStudents = group.students.map(student => student._id);
    students.forEach(student => {
      if(inputRef.current[student._id].checked)
        groupStudents.push(student._id);
        //console.log(group.students);
        inputRef.current[student._id].checked = false;
    })
    //console.log(group)

    try {
        await axios.put(`http://localhost:3000/promotions/${promoId}/groups/${groupId}`,
                                                                 {groupNumber: group.groupNumber, students: groupStudents})
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
            //console.log(err.message);
        }
    }
    //setGroup({groupNumber: '', students: []});
    setRefresh(!refresh);
  }

  const removeStudent = async(studentId) =>  {
    
    const groupStudents = group.students.map(student => student._id);
    //console.log(groupStudents);
    try {
        await axios.put(`http://localhost:3000/promotions/${promoId}/groups/${groupId}`, 
                                                                 {groupNumber: group.groupNumber,
                                                                  students: groupStudents.filter(student => student !== studentId)})
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
            //console.log(err.message);
        }
    }

    setRefresh(!refresh);
  }

  /*const handleChange = (id) => {
    if(inputRef.current[id].checked){
      console.log(22222222222)

    }

  }*/
  return (
    <>
        
        {group && 
        (<>
          <Row>
            <Col md={6}>
              <div className='d-flex justify-content-center groups'>
                <h2> Add student to group {group.groupNumber}: </h2>
                <Form onSubmit={addStudents}>
                  <Row>
                    {students && students.map(student => (

                      <div key={student._id} className="mb-3">
                        <Form.Check
                          ref={el => inputRef.current[student._id] = el}
                          type="checkbox"
                          id={student._id}
                          label={`${student.lastName} ${student.firstName}`}
                          disabled={promotion.groups?.filter(group => group.students?.some(item => item._id === student._id)).length !== 0 ? true : false} />
                      </div>

                    ))}

                  </Row>
                  <Col xs={12} md={2}>
                    <Button type="submit">
                      Update
                    </Button>
                    
                  </Col>
                </Form>
              </div>
            </Col>
            <Col md={6}>
              <div className='d-flex justify-content-center groups'>
                <h2> Group {group.groupNumber} students: </h2>
                <ListGroup as="ol" numbered>
                  {group.students && group.students.map(student => (

                    <ListGroup.Item as="li" key={student._id}>
                      {student.lastName} {student.firstName} {`        `}
                      <FontAwesomeIcon onClick={() => removeStudent(student._id)} icon={faTrashCan} />
                    </ListGroup.Item>
                  )
                  )}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </>)
      } 
    </>
  );
}