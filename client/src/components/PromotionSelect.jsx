import * as React from 'react';
import { Form } from 'react-bootstrap';

export default function PromotionSelect({setGradesByPromo, grades, setPromoStudents, students}) {
    
    

    

    return (
        <>
             <Form.Group className="my-3 " >
                        <Form.Select  onChange={(e) => {setGradesByPromo(grades.filter(grade => 
                                                                    grade.student.level===e.target.value));
                                                        setPromoStudents(students.filter(student =>
                                                                    student.level===e.target.value));
                        }} 
                                        aria-label="promotion grades select"
                                        className='inputs-button'>
                            
                            <option selected value="L1" >Promotion: L1</option>
                            <option value="L2" >Promotion: L2</option>
                            <option value="L3" >Promotion: L3</option>
                            <option value="M1" >Promotion: M1</option>
                            <option value="M2" >Promotion: M2</option>        
                        </Form.Select>
            </Form.Group>
            
        </>        
    );
}