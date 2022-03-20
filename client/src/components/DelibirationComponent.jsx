import * as React from 'react';
import axios from "axios";
import { Row, Col, Button, Form, Table, DropdownButton, Dropdown } from 'react-bootstrap';

import courseAverage from '../functions/courseAverage';
import semesterAverage from '../functions/semesterAverage';
///// POPULATION STUDENT COURSE

const AverageCalcultion = ({courses, studentId, grades, semester}) => {
    // we do that to make sure that grades are assigned to the coresponding course in our table
                        // in the right order.
        
        let studentIdGrades = courses.filter(course => course.semester===semester)
                            .map(course => grades.find(grade =>
                                    grade.course._id===course._id&&grade.student._id===studentId))
        //console.log(studentIdGrades);
        let coursesAverages = studentIdGrades.map(grade => courseAverage(grade))
        console.log(coursesAverages);

        return (
            <>
                {coursesAverages.map(avg => 
                    //add unique key
                    <td>{avg===null ? (0).toFixed(2) : avg.toFixed(2)}</td>
                )}
            </>
        );

    }

export default function DelibirationComponent() {

    const [grades, setGrades] = React.useState([]);
    const [gradesByPromo, setGradesByPromo] = React.useState([]);
    const [students, setStudents] = React.useState([]);
    const [studentsByPromo, setStudentsByPromo] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [coursesByPromo, setCoursesByPromo] = React.useState([]);
    //console.log(coursesByPromo)
    //console.log(coursesByPromo);
    React.useEffect(() => {
        const getGrades = async() =>{
            try {
                const gradesData = await axios.get(`http://localhost:3000/grades`);
                const studentsData = await axios.get(`http://localhost:3000/students`);
                const coursesData = await axios.get(`http://localhost:3000/modules`);
                //console.log(data);
                setGrades(gradesData.data);
                setStudents(studentsData.data);
                setCourses(coursesData.data);
            } catch (err) {                             
                if(err instanceof Error){
                    console.log(err.message);
                }
            }
        } 
        getGrades();
    }, []);

    
    
    return (
    <>
        <Row>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3" >
              <Form.Label>Promotion</Form.Label>
              <Form.Select  onChange={(e) => {setGradesByPromo(grades.filter(grade => 
                                                          grade.student.level===e.target.value));
                                              setCoursesByPromo(courses.filter(course => 
                                                            course.major===e.target.value  ))
                                              setStudentsByPromo(students.filter(student =>
                                                            student.level===e.target.value))}} 
                            aria-label="promotion grades select">
                  <option >choose..</option>
                  <option value="L1" >L1</option>
                  <option value="L2" >L2</option>
                  <option value="L3" >L3</option>
                  <option value="M1" >M1</option>
                  <option value="M2" >M2</option>        
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {studentsByPromo.length!==0 &&
        <Row>
            <Table className="all"  bordered hover responsive>
            <thead>
                
                <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>G</th>
                {coursesByPromo.filter(course => course.semester==='1').map(course =>
                    <th key={course._id}>{course.name}</th>
                )}
                <th>avg sem. 1</th>
                {coursesByPromo.filter(course => course.semester==='2').map(course =>
                    <th key={course._id}>{course.name}</th>
                )}
                <th>avg sem. 2</th>
                <th>avg {studentsByPromo[0].level}</th>
                </tr>
            </thead>
            <tbody>
                {studentsByPromo.map(student =>
                <tr key={student._id}>
                   <td>{student.studentId}</td>
                   <td>{student.firstName}</td>
                   <td>{student.lastName}</td> 
                   <td>{/*coursesByPromo[0]?.promotion?.groups?.filter(group => group.students.some(item =>
                                         item._id==student._id))[0].groupNumber*/1}</td> 
                   <AverageCalcultion courses={coursesByPromo} studentId={student._id} grades={gradesByPromo} semester={'1'} />
                   <td>{semesterAverage(gradesByPromo.filter(grade => grade.student._id===student._id&&
                                                                      grade.course.semester==='1'))[0].toFixed(2)}</td> 
                   <AverageCalcultion courses={coursesByPromo} studentId={student._id} grades={gradesByPromo} semester={'2'} /> 
                   <td>{semesterAverage(gradesByPromo.filter(grade => grade.student._id===student._id&&
                                                                      grade.course.semester==='2'))[0].toFixed(2)}</td>
                   <td>{semesterAverage(gradesByPromo.filter(grade => grade.student._id===student._id))[0].toFixed(2)
                       //it can be used to calculate annual avg by providing all year courses grades as args
                    }</td>
                </tr>
                )}
            </tbody>
            </Table>
        </Row>}
    </>
    );
}

 