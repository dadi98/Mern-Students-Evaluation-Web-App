import axios from 'axios';
import * as React from 'react';
import { Row, Col, Container, Button, Form, Table, DropdownButton, Dropdown } from 'react-bootstrap';

export default function GradeComponent () {
  
  const [courses, setCourses] = React.useState([]);
  //console.log(courses);
  const [course, setCourse] = React.useState();
  const [group, setGroup] = React.useState();
  const [type, setType] = React.useState();// type of evaluation
  const [grades, setGrades] = React.useState([]);
  const [error, setError] = React.useState();
  console.log(type)
  const inputRef = React.useRef([]);
  //console.log(globalThis);
  //const [q, setQ] = React.useState({promotion: '', semester: ''});
  //const [searchParam] = React.useState<Array<string>>(["promotion", "semester"]);
  React.useEffect(() => {
    const getCourses = async() => {
      try {
        const { data } = await axios.get('http://localhost:3000/courses')
        
        setCourses(data);
        //console.log(data)
        //setGrades(courses.map(course => ({student: course.promotion.groups.,course: course._id})))
        let gradesUpdate = [];
        data.forEach(course => 
                            course.promotion?.groups?.forEach(group =>
                                               group.students?.forEach(student =>
                                                                        //console.log(1);
                                                                        gradesUpdate.push({student: student._id,
                                                                                           course: course._id,
                                                                                           evaluation: 0.00,
                                                                                           absent: false})
                                                                     )
                                                     )
                                    )
       setGrades(gradesUpdate);
        //setTeachers(data.map(item => item.teacher));
      } catch (err) {
        if(err instanceof Error){
          setError(err.message);
          console.log(error);
      
        }
      }

    }
    getCourses();
  }, [error]);

  /*const Search = (items) => {
    console.log(1)
    return items.filter(item =>  item.promotion === q.promotion && item.semester === q.semester )
  }*/
  //inputRef.current[student._id].checked
  const updateValue = (e, courseId, studentId) => {
    setGrades(grades.map(grade =>
            (grade.course === courseId && grade.student === studentId ? {...grade, evaluation: e.target.value===null ? 0.00 : e.target.value} : grade)
      ))
  }
  const updateAbsent = (courseId, studentId) => {
    
    setGrades(grades.map(grade =>
            (grade.course === courseId && grade.student === studentId ? {...grade, absent: inputRef.current[studentId].checked} 
                                                                    : grade)
      ))
  }

  const postUpdates = async() => {
    
    //group.students.forEach();
    try {
      const { data } = await axios.get(`http://localhost:3000/grades?course=${course._id}`);
      
      
      
      group.students.forEach(async(student) => {
          //console.log(grades)
          let grade = grades.filter(grade => grade.student===student._id && grade.course===course._id)[0];
          //console.log(grade)
          let gradeDocument = data.filter(a => a.student._id===student._id && a.course._id===course._id)[0];
          //console.log(gradeDocument)
          if(!gradeDocument) {
            let gradeToPost = {
                        student: grade.student,
                        course: grade.course,
                        evaluations: [{type,
                                        absent: grade.absent,
                                        value: grade.evaluation==null ? 0.00 : grade.evaluation}]
              };
            
              await axios.post('http://localhost:3000/grades', gradeToPost )
          } else {
            let evaluation = gradeDocument.evaluations.filter(a => a.type===type)[0];
                if(!evaluation) {
                    await axios.post(`http://localhost:3000/grades/${gradeDocument._id}/evaluations`, {type,
                                                                                                        absent: grade.absent,
                                                                                                        value: grade.evaluation==null ? 0.00 : grade.evaluation})
                } else {
                    await axios.put(`http://localhost:3000/grades/${gradeDocument._id}/evaluations/${evaluation._id}`,
                                                                                                       {type,
                                                                                                        absent: grade.absent,
                                                                                                        value: grade.evaluation==null ? 0.00 : grade.evaluation})
                }
          } 
      })
      //setUpdateToggle(false);  
      
    } catch (err) {
      if(err instanceof Error){
        console.log(err);
      }
    } 
  }/**/
  //console.log(q.promotion)
  //console.log(q.semester)
  
 /* const TeacherUpdate = ({item}) => {
    
    /*const Search = (teachers: string[]) => {
      return teachers.filter(teacher => teacher.toLowerCase().indexOf(qTeacher.toLowerCase()) > -1)
    }

    return (
      <>
        <Form.Select onChange={(e) => updateTeacher(e, item)} value={item.teacher} aria-label="teacher select">
          
          <option value="" >None</option>
          {
            teachers.map(teacher => <option value={teacher} >{teacher}</option>)
          }
        </Form.Select>
      </>
    );
  }*/
  

  return (
    <>
      <div className=''>
          <Container fluid className='inputs-container bg-white ' >
            <Row className="inputs-row">
              <Col md={4}>
                <Form.Group className="" >
                  <Form.Select  onChange={(e) => {/**/setGroup(undefined);
                                                      setCourse(courses.filter(course => course._id===e.target.value)[0])
                                                      setType('');
                                                      }}
                                aria-label="semester select"
                                className='inputs-button'>
                      <option >Course...</option>
                      {courses?.filter(course => JSON.parse(localStorage.getItem('user')).role==='Admin' ? true : 
                                        course.teacher?._id===JSON.parse(localStorage.getItem('user'))._id)
                              .map(course => 
                        <option key={course._id} value={course._id} >{course.name}</option>
                        )
                      }
                  </Form.Select>
                </Form.Group>
              </Col>
              {/*<Col xs={12} md={3}>
                <Button onClick={() => {setUpdateToggle(false); setFiltered(Search(Courses));}}>
                  Apply
                </Button>
                    </Col>*/}
              { course && 
                
                  <><Col md={3} className='ms-auto'>
                <Form.Group className="">
                  <Form.Select onChange={(e) => setType(e.target.value)}
                    aria-label="type select"
                    className='inputs-button'>
                    <option selected>Evaluation type...</option>
                    {course.type === 'CM' ?
                      <>
                        <option value="Control">Control</option>
                        <option value="Exam">Exam</option>
                        <option value="Replacement">Replacement</option>
                        <option value="Make up">Make up</option>
                      </> :
                      <option value="Lab">Lab</option>}
                  </Form.Select>
                </Form.Group>
              </Col><Col md={3}>
                  <Form.Group className="">
                    <Form.Select onChange={(e) => setGroup(course.promotion?.groups?.filter(group => group.groupNumber === e.target.value)[0])}
                      aria-label="type select"
                      className='inputs-button'>
                      <option selected>Group...</option>
                      {course.promotion?.groups?.map(group => <option key={group.groupNumber} value={group.groupNumber}>group {group.groupNumber}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col></>
                
              }
            </Row>
          </Container>
          <div className='tables'>
          { course && group &&
                  <>
                      <table className="table table-bordered table-hover evaluation-table" >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student</th>
                                <th>{type}</th>
                                <th>Absent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.students?.map(student => (
                                <tr key={student._id}>
                                    <td>{student.studentId} </td>
                                    <td>{student.lastName} {student.firstName} </td>
                                    <td><Form.Control type="search"
                                            onChange={e => updateValue(e, course._id, student._id)} /></td>
                                    <td><Form.Check 
                                          ref={ el => inputRef.current[student._id] = el}
                                          onChange={() => updateAbsent(course._id, student._id)}
                                          type="checkbox"
                                          id={student._id}
                                          //label={`${student.lastName} ${student.firstName}`}
                                          //disabled={promotion.groups?.filter(group => 
                                                      // group.students?.some(item => item._id === student._id)).length !== 0 ? true : false}
                                      /></td>
                            {/**/}
                                </tr>
                            ))}
                        </tbody>
                      </table>
                      <div className='action-button'>
                        <Button className='submit' onClick={postUpdates}>submit</Button>
                      </div>
                      
                      {/*<Button onClick={postUpdates}>update</Button>*/}
                  </>
                }
          </div>
      </div>
    </>
  );
}
