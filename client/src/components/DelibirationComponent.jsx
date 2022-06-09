import * as React from 'react';
import axios from "axios";
import {Row, Col, Container, Form} from 'react-bootstrap';

//import { PDFViewer } from '@react-pdf/renderer';
//import MyDocument from './MyDocument';

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
       // console.log(coursesAverages);

        return (
            <>
                {coursesAverages.map(avg => 
                    //add unique key
                    <td id='delib-courses'>{avg===null ? (0).toFixed(2) : avg.toFixed(2)}</td>
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
    const [group, setGroup] = React.useState();
    //const inpRef = React.useRef({});
    //console.log(coursesByPromo)
    //console.log(inpRef);
    React.useEffect(() => {
        const getGrades = async() =>{
            try {
                const gradesData = await axios.get(`http://localhost:3000/grades`);
                const studentsData = await axios.get(`http://localhost:3000/students`);
                const coursesData = await axios.get(`http://localhost:3000/courses`);
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

    /*const decision = (studentId) => {
        console.log(inpRef.current);
        let x = JSON.parse(JSON.stringify())
        if(document.getElementById(studentId)!==null) {console.log(document.getElementById("demo"));}
        
        
    }

    const scroll = () => {
        let table = document.getElementById('table');
        console.log(table.children);
        table.addEventListener('scroll', (e) => {
            //table.children[0].width(table.width() + table.scrollLeft());
            table.children[0].style.Width = table.offsetWidth + table.scrollLeft;
            table.children[1].style.Width = (table.offsetWidth + table.scrollLeft) + 'px';
        });
    }*/
    
    return (
    <>
    <div className=''>
        <Container fluid className='inputs-container bg-white ' >
            <Row className="inputs-row">
                <Col md={3}>
                    <Form.Group className="" >
                        <Form.Select  onChange={(e) => {setGradesByPromo(grades.filter(grade => 
                                                                    grade.student.level===e.target.value));
                                                        setCoursesByPromo(courses.filter(course => 
                                                                        course.major===e.target.value  ));
                                                        }} 
                                        aria-label="promotion grades select"
                                        className='inputs-button'>
                            <option >Promotion...</option>
                            <option value="L1" >L1</option>
                            <option value="L2" >L2</option>
                            <option value="L3" >L3</option>
                            <option value="M1" >M1</option>
                            <option value="M2" >M2</option>        
                        </Form.Select>
                    </Form.Group>
                </Col>
                { gradesByPromo.length!==0 &&
                <Col md={3}>
                    <Form.Group className="" >
                        <Form.Select  onChange={(e) => {setStudentsByPromo(courses[0].promotion?.groups.filter(group =>
                                                                        group.groupNumber===e.target.value)[0].students);
                                                        setGroup(e.target.value);}} 
                                        aria-label="promotion grades select"
                                        className='inputs-button'>
                            <option >Select group...</option>
                            {[...Array(courses[0].promotion?.numberOfGroups).keys()].map(x =>
                                      <option key={ x + 1 } value={ x + 1 } > Group { x + 1 } </option>
                                    )}
                                   
                        </Form.Select>
                    </Form.Group>
                </Col>}
            </Row>
        </Container>
        <div className='tables' style={{ }}>
        {studentsByPromo.length!==0 && 
            <table id='table' 
                   className="table table-bordered table-hover deliberation-table" >
            <thead>
                <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th id='delib-courses'>G</th>
                {coursesByPromo.filter(course => course.semester==='1').map(course =>
                    <th key={course._id} id='delib-courses'>{course.code}</th>
                )}
                <th id='delib-courses'>avg S1</th>
                {coursesByPromo.filter(course => course.semester==='2').map(course =>
                    <th key={course._id} id='delib-courses'>{course.code}</th>
                )}
                <th id='delib-courses'>avg S2</th>
                <th id='delib-courses'>avg {studentsByPromo[0].level}</th>
                <th>decision</th>
                </tr>
            </thead>
            <tbody style={{maxHeight: '500px'}}>
                {studentsByPromo.map(student =>
                <tr key={student._id}>
                   <td>{student.studentId}</td>
                   <td>{student.firstName}</td>
                   <td>{student.lastName}</td> 
                   <td id='delib-courses'>{coursesByPromo[0]?.promotion?.groups?.filter(group => group.students.some(item =>
                                                        item._id===student._id))[0].groupNumber/**/}</td> 
                   <AverageCalcultion courses={coursesByPromo} studentId={student._id} grades={gradesByPromo} semester={'1'} />
                   <td id='delib-courses'>{semesterAverage(gradesByPromo.filter(grade => grade.student._id===student._id&&
                                                                      grade.course.semester==='1'))[0].toFixed(2)}</td> 
                   <AverageCalcultion courses={coursesByPromo} studentId={student._id} grades={gradesByPromo} semester={'2'} /> 
                   <td id='delib-courses'>{semesterAverage(gradesByPromo.filter(grade => grade.student._id===student._id&&
                                                                      grade.course.semester==='2'))[0].toFixed(2)}</td>
                   <td id='delib-courses'>
                       {semesterAverage(gradesByPromo.filter(grade => grade.student._id===student._id))[0].toFixed(2)
                       //it can be used to calculate annual avg by providing all year courses grades as args
                    }</td>
                    
                    <td>{semesterAverage(gradesByPromo.filter(grade => grade.student._id===student._id))[0] >= 10 ?
                            'Admis' : 'Ajourné'
                    }</td> 
                </tr>
                )}
            </tbody>
            </table>
            }
        </div>
        
        </div>
    </>
    );
}

 