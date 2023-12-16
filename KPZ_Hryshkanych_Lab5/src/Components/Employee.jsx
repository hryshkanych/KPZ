import React, {Fragment, useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../Services/apiInterseptor.jsx';
import { getEmployeeData, getEmployeeById, updateEmployee, deleteEmployee, addEmployee } from '../Services/EmployeeSevices.jsx';



const Employee = () =>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");

    const [editId, setEditId] = useState("");
    const [editName, setEditName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editPosition, setEditPosition] = useState("");

    useEffect(()=>{
         // Приклад використання сервісу для отримання даних
        apiService.get('/Employee')
        .then((response) => {
        console.log('Data from API:', response.data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
        getData();
    },[])


    const getData = () => {
        getEmployeeData()
        .then((data) => {
            setData(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    const handleEdit= (id) =>{
        handleShow();
        getEmployeeById(id)
        .then((result) => {
            setEditName(result.firstName);
            setEditLastName(result.lastName);
            setEditPosition(result.position);
            setEditId(id); // for update
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleUpdate = () => {
        const employeeData = {
            id: editId,
            firstName: editName,
            lastName: editLastName,
            position: editPosition,
        };
        
        updateEmployee(editId, employeeData)
            .then(() => {
                getData();
                clear();
                toast.success('Updated successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete the Employee?')) {
            deleteEmployee(id)
            .then((result) => {
                if (result === true) {
                    toast.success('Employee was successfully deleted');
            }
            getData();
            })
            .catch((error) => {
                console.log(error);
            });
        }
};
    


const handleSave = async () => {
    const added = await addEmployee(id, name, lastName, position);

        if (added) {
        handleClose();
        getData();
        clear();
        toast.success("New employee is added");
        } else {
            console.error("Failed to add employee");
        }
        clear();
};


    const clear = () => {
        setId('');
        setName('');
        setLastName('');
        setPosition('');
        setEditName('');
        setEditLastName('');
        setEditPosition('');
        setEditId('');
    }

    return(

        <Fragment>
            <ToastContainer/>
            <Container className="md-100" >  ⠀⠀⠀⠀⠀
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter id" 
                    value={id} onChange={(e) => setId(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter firstName" 
                    value={name} onChange={(e) => setName(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter lastName"
                    value={lastName} onChange={(e) => setLastName(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter position"
                    value={position} onChange={(e) => setPosition(e.target.value) }/></Col>
                    <Col><button className="btn btn-success" onClick={() => handleSave()}>Submit</button></Col>
                </Row>
                

            </Container> ⠀⠀⠀
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return(
                                    <tr key = {index} >
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.position}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-secondary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        :
                        'Loading'
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Brand</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <Container>
                        <Row>
                            <Col><input type="text" className="form-control" placeholder="Enter firstName" 
                            value={editName} onChange={(e) => setEditName(e.target.value) }/></Col>
                            <Col><input type="text" className="form-control" placeholder="Enter lastName"
                            value={editLastName} onChange={(e) => setEditLastName(e.target.value) }/></Col>
                            <Col><input type="text" className="form-control" placeholder="Enter position"
                            value={editPosition} onChange={(e) => setEditPosition(e.target.value) }/></Col>
                            </Row>
                        </Container>
                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"  onClick={() => handleUpdate()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>

    )
}

export default Employee;