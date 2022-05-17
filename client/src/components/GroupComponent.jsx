import * as React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Button, Form, Table, DropdownButton, Dropdown, Container, ListGroup} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

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

  const deleteGroup = async(groupId) => {
    

    try {
        await axios.delete(`http://localhost:3000/promotions/${promotion._id}/groups/${groupId}`)
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
            //console.log(err.message);
        }
    } 

    setRefresh(!refresh);
  }

  return (
    <>
      
        <Container  className='my-2 px-0 groups-container'>
          <Row className=''>
              <Col xs={12} md={4} className=''>
                <div style={{/**/height: "12.5rem"}} className='groups-section'>
                  
                    <h4 className='groups-section-header'> Promotion {promotion.year} {promotion.major}</h4>
                    <Form onSubmit={addGroup}>
                        <Form.Group className="" >
                            <Form.Select  defaultValue={'3'}
                                          onChange={(e) => setGroup(state => ({...state, groupNumber: e.target.value}))}
                                          aria-label="promotion select">
                                <option >Select Group</option>
                                {[...Array(promotion?.numberOfGroups).keys()].map(x =>
                                      <option key={ x + 1 } value={ x + 1 } > { x + 1 } </option>
                                    )}
                            </Form.Select>
                        </Form.Group>
                    
                        <Button  type="submit" className='groups-section-button'>
                            Add Group
                        </Button>
                    </Form>
                </div>
                <div className='groups-section' style={{/**/height: "27rem"}}>
                  <h4 className='groups-section-header'> Promotion {promotion.year} {promotion.major} groups:</h4>
                  <ListGroup as="ul" className="groups-section-list-group">
                    {promotion.groups?.map(group => 
                      <ListGroup.Item key={group._id} as="li" 
                                      action variant='light' 
                                      onClick={() => setGroupId(group._id)} 
                                      className="d-flex"> 
                        Group: {group.groupNumber}
                        <FontAwesomeIcon onClick={() => deleteGroup(group._id)} 
                                         icon={faTrashCan} 
                                         className='trash-icon' />
                      </ListGroup.Item>
                    )}
                    </ListGroup>
                </div> 
             </Col>
             <Col xs={12} md={8} className=''>
                <AssignStudents promoId={promoId} groupId={groupId}/>
             </Col>
            </Row>
          </Container>
    </>
  );
}