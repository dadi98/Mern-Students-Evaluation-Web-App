import axios from 'axios';
import * as React from 'react';
import { Button, Col, Container, Row, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StudentChart from './StudentChart';
import PromotionSelect from './PromotionSelect';

import resultsStatistics from '../functions/resultsStatistics';

export default function Dashboard() {
    const [promotions, setPromotions] = React.useState([]);
    const [students, setStudents] = React.useState([]);
    const [grades, setGrades] = React.useState([]);
    const [promoStudents, setPromoStudents] = React.useState([]);
    const [gradesByPromo, setGradesByPromo] = React.useState([]);
    const [numberOfstudents, setNumberOfStudents] = React.useState([]);
    const Navigate = useNavigate();
    
    console.log(numberOfstudents);

    const results = gradesByPromo.length!==0 && promoStudents!==0 && resultsStatistics(promoStudents, gradesByPromo)

    React.useEffect(() => {
        const getData = async() => {
            try {
                const promotions = await axios.get('http://localhost:3000/promotions')
                const students = await axios.get(`http://localhost:3000/students`);
                const grades = await axios.get(`http://localhost:3000/grades`);
                ['L1', 'L2', 'L3', 'M1', 'M2'].forEach(item => setNumberOfStudents(state => 
                                 ([...state, 
                                    {major: item,
                                    number: students.data.filter(student => student.level===item).length}
                                   ])))
                

                setPromotions(promotions.data);
                setStudents(students.data);
                setGrades(grades.data);

                setGradesByPromo(grades.data.filter(grade => 
                    grade.student.level==='L1'))
                setPromoStudents(students.data.filter(student =>
                    student.level==='L1'))
                
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    return ( 
    <>
        <Container className=' h-100'>
            <Row className=' mb-5 d-flex justify-content-center'>
                <Col md={5} className='bg-light dash-col'>
                    <div className='d-flex justify-content-center mx-auto mt-3'>
                        <h4 className=' '>Number of students per promotion</h4>
                        
                    </div>
                    <ListGroup as="ul" className=" mt-4">
                            {numberOfstudents?.map(item => 
                                <ListGroup.Item key={item.major} as="li" 
                                                action  
                                                className="d-flex mb-2"> 
                                    Promotion: {item.major}
                                    <span className='ms-auto'>{item.number}</span>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    

                </Col>
                <Col md={{ span: 6, offset: 1 }} className='bg-light'>
                   <StudentChart results={results}/>
                   <PromotionSelect setGradesByPromo={setGradesByPromo} 
                                    grades={grades}
                                    setPromoStudents={setPromoStudents}
                                    students={students}/>
                </Col>
            </Row>
            <Row className='dash-row mx-auto bg-light d-flex justify-content-center'>
                    <div className='d-flex justify-content-center align-items-center mx-auto'>
                        <h2 className=' '>Promotions</h2>
                    </div>
                    {
                        promotions.map(promotion => (
                            <><Col md={2} className='d-flex align-items-center'>
                               <Button key={promotion._id} 
                                       onClick={() => Navigate(`promotions/${promotion._id}`) }
                                       className='promo-button h-75 w-100'>
                                           {promotion.major}

                               </Button>
                                </Col>
                            </>
                        ))
                    }
               
            </Row>   
        </Container>
    </> 
    );
}
 
 