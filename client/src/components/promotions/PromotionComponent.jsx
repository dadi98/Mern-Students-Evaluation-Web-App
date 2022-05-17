import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import AddPromotion from './AddPromotion';
import EditPromotion from './EditPromotion';
import DeletePromotion from './DeletePromotion';
//imrse, ffc, sfc
import { Row, Col, Container, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';


export default function PromotionComponent () {

  const [promotions, setPromotions] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  
  const [refresh, setRefresh] = React.useState(false);
  const [error, setError] = React.useState('');
  const [id, setId] = React.useState();

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
  }, [addModal, deleteModal, editModal, error, refresh]);

  const Search = (items) => {
    return items.filter(item => 
                        searchParam.some(param => 
                                         item[param].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
  }
  
  

  let navigate = useNavigate()

  return (
    <>  
      <div className=''>
        <Container fluid className='inputs-container bg-white' >
          <Row className="inputs-row">
            <Col md={2}  >
                <Button variant="" 
                        onClick={() => setAddModal(true)}
                        className='inputs-button button-primary' >Add promotion</Button>
            </Col>
            <Col md={2}>
                <Button variant=""
                        onClick={() => setRefresh(!refresh)}
                        className='inputs-button button-secondary' >Refresh</Button>
            </Col>
            <Col md={5} className='ms-auto'>
                <Form.Control type="search" placeholder="Search..." value={q}
                              className='inputs-button' onChange={(e) => setQ(e.target.value)}/>
            </Col>
          </Row>
        </Container>
        <div className='tables'>
            {promotions.length !== 0 && Search(promotions).length !== 0 ?
            (<table className="table table-bordered table-hover promotion-table" >
                <thead>
                    <tr>
                        <th>Actions</th>
                        <th>Academic year</th>
                        <th>Degree</th>
                        <th>Major</th>
                        <th>N°: Groups</th>
                    </tr>
                </thead>
                <tbody>
                    {Search(promotions).map(item => (
                    <tr key={item._id} >
                        <td>
                            <DropdownButton size="sm" id="dropdown-basic-button" title="">
                                <Dropdown.Item  onClick={() => {setId(item._id); setEditModal(true);}} >  Edit</Dropdown.Item>
                                <Dropdown.Item  onClick={() => {setId(item._id); setDeleteModal(true);}} >  Delete</Dropdown.Item>
                                <Dropdown.Item  onClick={() => navigate(`/promotions/${item._id}`)} >  Groups</Dropdown.Item>
                            </DropdownButton>
                        </td>
                        <td>{item.year}</td>
                        <td>{item.degree}</td>
                        <td>{item.major}</td>
                        <td>{item.numberOfGroups}</td>
                    </tr>
                    ))}
                </tbody>
            </table>) : (<h2 className='d-flex justify-content-center p-4' >No Promotions To Show !</h2>)}
            
        </div>
        <div>
            {addModal && <AddPromotion show={addModal} onHide={() => setAddModal(false)}/>}
            {deleteModal && <DeletePromotion show={deleteModal} onHide={() => setDeleteModal(false)} id={id}/>}
            {/*deleteAllModal && <DeleteAll show={deleteAllModal} onHide={() => setDeleteAllModal(false)}/>*/}
            {editModal && <EditPromotion show={editModal} onHide={() => setEditModal(false)} data={promotions} id={id}/>}
        </div>
      </div>
    </>
  );
}


