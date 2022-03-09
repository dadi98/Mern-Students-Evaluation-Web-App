import * as React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Button, Form, Table, DropdownButton, Dropdown } from 'react-bootstrap';
//imrse, ffc, sfc
export default function GroupComponent () {
  
  const [promotion, setPromotion] = React.useState({});
  //console.log(promotion)
  const [group, setGroup] = React.useState({groupNumber: '', students: []});
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
        <div>
            <h2> Create a group for promotion {promoId}</h2>
            <Form onSubmit={addGroup}>
                <Row>
                    <Col xs={12} md={2}>
                        <Form.Group className="mb-3" >
                            <Form.Label> select group name :</Form.Label>
                            <Form.Select  defaultValue={'3'}
                                          onChange={(e) => setGroup(state => ({...state, groupNumber: e.target.value}))}
                                          aria-label="promotion select">
                                <option >choose...</option>
                                {[...Array(promotion?.numberOfGroups).keys()].map(x =>
                                      <option key={ x + 1 } value={ x + 1 } > { x + 1 } </option>
                                    )}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                
                    <Col xs={12} md={2}>
                        <Button  type="submit">
                            Add Group
                        </Button>
                    </Col>
            </Form>
        </div>
        <div>
            <h2>  Promotion {promotion.year} {promotion.major} groups:</h2>
            <Row>
              {promotion.groups?.map(group => 
                <Col key={group._id} className="mr-0">
                  <Button onClick={() => Navigate(`/promotions/${promotion._id}/groups/${group._id}`)} > 
                    Group: {group.groupNumber}
                  </Button>
                </Col>
              )}
            </Row>
        </div>
      
    </>
  );
}