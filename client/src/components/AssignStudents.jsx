import * as React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
//imrse, ffc, sfc
import { Row, Col, Button, Form, ListGroup, Table, DropdownButton, Dropdown, Container } from 'react-bootstrap';
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
       <Container  className='px-0 '>
        {group && 
        (<>
          <Row className='mx-0'>
            <Col xs={12} md={6} className='groups-section' style={{/**/height: "41rem"}}>
                <h4 className='groups-section-header'> Add students to group {group.groupNumber} : </h4>
                <Form onSubmit={addStudents} style={{/**/height: "100%"}}>
                    <ListGroup as="ul" className="groups-section-list-group">
                    {students && students.map(student => (

                      <ListGroup.Item as="li" key={student._id}>
                        <Form.Check
                          data-testid='form-check'
                          ref={el => inputRef.current[student._id] = el}
                          type="checkbox"
                          id={student._id}
                          label={`${student.lastName} ${student.firstName}`}
                          disabled={promotion.groups?.filter(group => group.students?.some(item => item._id === student._id)).length !== 0 ? true : false} />
                      </ListGroup.Item>

                    ))}
                    </ListGroup>
                    <Button type="submit" className='groups-section-button'>
                      Update
                    </Button>
                </Form>
            </Col>
            <Col xs={12} md={6} className=' group-students' >
              <div style={{width: ''}} className='groups-section' style={{/**/height: "41rem"}}>
                <h4 className='groups-section-header'> Group {group.groupNumber} students: </h4>
                <ListGroup as="ul" className="groups-section-list-group">
                  {group.students && group.students.map(student => (

                    <ListGroup.Item as="li" key={student._id} style={{display:'flex'}}>
                      {student.lastName} {student.firstName} {`        `}
                      
                      <FontAwesomeIcon onClick={() => removeStudent(student._id)} 
                                       icon={faTrashCan} 
                                       className='trash-icon' />
                    </ListGroup.Item>
                  )
                  )}
                </ListGroup>
                </div>
            </Col>
          </Row>
        </>)
      } 
      </Container> 
    </>
  );
}