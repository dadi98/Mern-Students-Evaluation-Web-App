import * as React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Button, Form, Table, DropdownButton, Dropdown, Container, ListGroup} from 'react-bootstrap';
import AssignStudents from './AssignStudents';
//imrse, ffc, sfc
export default function GroupComponent () {
  
  const [promotion, setPromotion] = React.useState({});
  //console.log(promotion)
  const [group, setGroup] = React.useState({groupNumber: '', students: []});
  const [groupId, setGroupId] = React.useState();
  const [refresh, setRefresh] = React.useState(false);
  const [error, setError] = React.useState('');
  //const [q, setQ] = React.useState('');
  //const [searchParam] = React.useState(["year", "major"]);
  const { promoId } = useParams();
  let Navigate = useNavigate();

  React.useEffect(() => {
    const getPromotion = async() => {
      try {
        
        const promotionData = await axios.get(`http://localhost:3000/promotions/${promoId}`);
        promotionData.data.groups = promotionData.data.groups.sort((a, b) => a.groupNumber - b.groupNumber)
        setPromotion(promotionData.data);
        //console.log(data);
      } catch (err) {
        if(err instanceof Error){
          setError(err.message); 
          console.log(error);
        }
      }
    }
    
    getPromotion();
  }, [promoId, error, refresh]);

  /*const Search = (items) => {
    return items.filter(item => 
                        searchParam.some(param => 
                                         item[param].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
  }*/
  
  const addGroup = async(e) => {
    e.preventDefault();

    try {
        await axios.post(`http://localhost:3000/promotions/${promotion._id}/groups`, group)
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
            //console.log(err.message);
        }
    }
    setGroup({groupNumber: '', students: []});
    setRefresh(!refresh);
  }

  return (
    <>
      <div className='promotion-groups'>
        <Container>
          <Row>
              <Col md={5} className=''>
                <div style={{/*backgroundColor: "#e6e5e3"*/}} className='groups d-flex justify-content-center  '>
                  <div className='w-75 '>
                    <h4> Promotion {promotion.year} {promotion.major}</h4>
                    <Form onSubmit={addGroup}>
                        <Row>
                            <Col xs={12} md={8}>
                                <Form.Group className="mb-5" >
                                    <Form.Select  defaultValue={'3'}
                                                  onChange={(e) => setGroup(state => ({...state, groupNumber: e.target.value}))}
                                                  aria-label="promotion select">
                                        <option >Select Group</option>
                                        {[...Array(promotion?.numberOfGroups).keys()].map(x =>
                                              <option key={ x + 1 } value={ x + 1 } > { x + 1 } </option>
                                            )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={4} style={{backgroundColor: "red"}} >
                                <Button  type="submit" className='ms-auto'>
                                    Add Group
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                  </div>
                </div>
                <div className='groups mt-4'>
                  <div className='ms-4'>
                    <h4>  Promotion {promotion.year} {promotion.major} groups:</h4>
                    
                      {promotion.groups?.map(group => 
                        
                          <ListGroup.Item key={group._id} as="li" 
                                          action variant='light' 
                                          onClick={() => setGroupId(group._id)} 
                                          className="mb-2"> 
                            Group: {group.groupNumber}
                          </ListGroup.Item>
                        
                      )}
                  </div> 
                </div>
             </Col>
             <Col>
                <AssignStudents promoId={promoId} groupId={groupId}/>
             </Col>
            </Row>
          </Container>
        </div>
    </>
  );
}