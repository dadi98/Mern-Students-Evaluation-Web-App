import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
//imrse, ffc, sfc
import { Row, Col, Button, Form, Table, DropdownButton, Dropdown } from 'react-bootstrap';

export default function PromotionComponent () {

  const [promotion, setPromotion] = React.useState({year: '', degree: '', major: '', numberOfGroups: ''});
  const [promotions, setPromotions] = React.useState([]);
  
  const [refresh, setRefresh] = React.useState(false);
  const [error, setError] = React.useState('');

  const [q, setQ] = React.useState('');
  const [searchParam] = React.useState(["year", "major"]);
  
  // console.log(rows);
  React.useEffect(() => {
    const getPromotions = async() => {
      try {
        const { data } = await axios.get('http://localhost:3000/promotions');
        setPromotions(data);
        //console.log(data);
      } catch (err) {
        if(err instanceof Error){
          setError(err.message); 
          console.log(error)
        }
      }
    }
    
    getPromotions();
  }, [error, refresh]);

  const Search = (items) => {
    return items.filter(item => 
                        searchParam.some(param => 
                                         item[param].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
  }
  
  const addPromotion = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3000/promotions', promotion)
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
            //console.log(err.message);
        }
    }
    setRefresh(!refresh);
  }

  let navigate = useNavigate()

  return (
    <>
        <div>
            <Form onSubmit={addPromotion}>
                <Row>
                    <Col xs={12} md={2}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Year :</Form.Label>
                            <Form.Control type="text" placeholder="Academic year yy/yy" 
                                                    onChange={(e) => setPromotion(state => ({...state, year: e.target.value}))}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={2}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Degree :</Form.Label>
                            <Form.Select  onChange={(e) => setPromotion(state => ({...state, degree: e.target.value}))} aria-label="promotion select">
                                <option >choose..</option> 
                                <option value="License" >License</option>
                                <option value="Master" >Master</option>       
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={2}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Major :</Form.Label>
                            <Form.Select  onChange={(e) => setPromotion(state => ({...state, major: e.target.value}))} aria-label="semester select">
                                <option >choose..</option>
                                <option value="L1" >L1</option>
                                <option value="L2" >L2</option>
                                <option value="L3" >L3</option>
                                <option value="M1" >M1</option>
                                <option value="M2" >M2</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={2}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Number of groups :</Form.Label>
                            <Form.Control type="text" 
                                                    onChange={(e) => setPromotion(state => ({...state, numberOfGroups: e.target.value}))}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={2}>
                        <Button  type="submit">
                            Add Promotion
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div>
            <h3> Promotions </h3>
            <Form.Group className="mb-3" controlId="search-field">
                <Row>
                    <Col lg={1}>
                        <Form.Label> Find a promotion:</Form.Label>
                    </Col>
                    <Col lg={3}>
                        <Form.Control type="search" placeholder="search for a promotion" value={q}
                                            onChange={(e) => setQ(e.target.value)}/>
                    </Col>
                </Row>
            </Form.Group>
            {promotions.length !== 0 && Search(promotions).length !== 0 ?
            (<Table className="all" striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Year</th>
                        <th>Degree</th>
                        <th>Major</th>
                        <th>N°: Groups</th>
                    </tr>
                </thead>
                <tbody>
                    {Search(promotions).map(item => (
                    <tr key={item._id} >
                        <td onClick={() => navigate(`/promotions/${item._id}`)}>{item._id}</td>
                        <td>{item.year}</td>
                        <td>{item.degree}</td>
                        <td>{item.major}</td>
                        <td>{item.numberOfGroups}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>) : (<h5>no promotions to show</h5>)}
            
        </div>
      
    </>
  );
}


