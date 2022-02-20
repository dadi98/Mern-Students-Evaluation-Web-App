
/* useEffect too many request, consider updating modules instead of filtered so changes will always
reflect when component is mounted
- try find a way to make all updates in a single onChange fct*/ 
import axios from 'axios';
import * as React from 'react';
import { Row, Col, Button, Form, Table, DropdownButton, Dropdown } from 'react-bootstrap';

interface Module {
  [key: string]: string | number;
  name: string;
  teacher: string;
  type: string;
  promotion: string;
  semester: string;
  coef: number;
  controlCoef: number;
  examCoef: number;
}

export default function ModulesComponent () {

  const [modules, setModules] = React.useState<Array<Module>>([]);
  const [filtered, setFiltered] = React.useState<Array<Module>>([]);

  const [teachers, setTeachers] = React.useState<Array<string>>([]);

  const [error, setError] = React.useState<string>();
  //console.log(teachers)
  const [updateToggle, setUpdateToggle] = React.useState<boolean>(false);
  const [editTeacher, setEditTeacher] = React.useState<boolean>(false);

  const [q, setQ] = React.useState({promotion: '', semester: ''});
  const [qTeacher, setQTeacher] = React.useState<string>('');

  //const [searchParam] = React.useState<Array<string>>(["promotion", "semester"]);
  
  React.useEffect(() => {
    const getModules = async(): Promise<Array<Module> | string | undefined> => {
      try {
        const { data } = await axios.get('http://localhost:3000/modules')
        setModules(data);
        setTeachers(data.map((item: Module) => item.teacher))
        
        
        return data;
      } catch (err) {
        if(err instanceof Error){
          setError(err.message);
          return err.message;
        }
      }

    }
    getModules();
  }, [updateToggle]);

  const Search = (items: Module[]) => {
    return items.filter(item => item.promotion == q.promotion && item.semester == q.semester)
  }
  
  const updateControlCoef = (e: React.ChangeEvent<HTMLInputElement> , item: Module) => {
    setFiltered(filtered.map(course =>
            (course.name == item.name ? {...course, controlCoef: (e.target as any).value} : course)
      ))
  }
  const updateExamCoef = (e: React.ChangeEvent<HTMLInputElement> , item: Module) => {
    setFiltered(filtered.map(course =>
            (course.name == item.name ? {...course, examCoef: (e.target as any).value} : course)
      ))
  }
  const updateTeacher = (e: React.ChangeEvent<HTMLSelectElement> , item: Module) => {
    setFiltered(filtered.map(course =>
            (course.name == item.name ? {...course, teacher: (e.target as typeof e.target).value} : course)
      ))
  }

  const postUpdates = () => {
    try {
      filtered.forEach(async(course) =>{ await axios.put(`http://localhost:3000/modules/${course._id}`, course); console.log(course); } )
      setUpdateToggle(false);
      
    } catch (err) {
      if(err instanceof Error){
        console.log(err.message);
      }
    } 
  }
  //console.log(q.promotion)
  //console.log(q.semester)
  
  interface UpdateTeacherProps {
    item: Module;
  }
  
  const TeacherUpdate = ({item}: UpdateTeacherProps) => {
    
    /*const Search = (teachers: string[]) => {
      return teachers.filter(teacher => teacher.toLowerCase().indexOf(qTeacher.toLowerCase()) > -1)
    }*/

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
  }
  

  return (
    <>
      <div>
        <Row>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3" >
              <Form.Label>Promotion</Form.Label>
              <Form.Select  onChange={(e) => setQ(state => ({...state, promotion: (e.target as typeof e.target).value}))} aria-label="promotion select">
                  <option >choose..</option>
                  <option value="L1" >L1</option>
                  <option value="L2" >L2</option>
                  <option value="L3" >L3</option>
                  <option value="M1" >M1</option>
                  <option value="M2" >M2</option>        
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-3" >
              <Form.Label>Semester</Form.Label>
              <Form.Select  onChange={(e) => setQ(state => ({...state, semester: (e.target as typeof e.target).value}))} aria-label="semester select">
                  <option >choose..</option>
                  <option value="1" >semester 1</option>
                  <option value="2" >semester 2</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Button onClick={() => {setUpdateToggle(false); setFiltered(Search(modules));}}>
              Apply
            </Button>
          </Col>

        </Row>
      </div>
      <div>
       { filtered.length !== 0 && 
       <>
        <Table className="all" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Module</th>
              <th>Type</th>
              <th>Control Coefficient</th>
              <th>Exam Coefficient</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                {updateToggle ?  <>
                                  <td><Form.Control type="search" value={item.controlCoef}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateControlCoef(e, item)}/></td>
                                  <td><Form.Control type="search" value={item.examCoef}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExamCoef(e, item)}/></td>
                                  <td><TeacherUpdate item={item} /></td>
                                 </>  :  <>
                                           <td>{item.controlCoef}</td>
                                           <td>{item.examCoef}</td>
                                           <td>{item.teacher}</td>
                                         </>}
                
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={() => setUpdateToggle(true)}>enable edit</Button>
        <Button onClick={postUpdates}>update</Button>
        </>
          }
      </div>
    </>
  );
}
	