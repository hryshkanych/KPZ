import React, {Fragment, useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCustomerData, getCustomerById, updateCustomer, deleteCustomer, addCustomer } from '../Services/CustomerServices.jsx';

const Employee = () =>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const [editId, setEditId] = useState("");
    const [editName, setEditName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editEmployeeId, setEditEmployeeId] = useState("");


    useEffect(()=>{
        getData();
    },[])


    const getData = () => {
        getCustomerData()
        .then((data) => {
            setData(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    const handleEdit= (id) =>{
        handleShow(); // window for updating
        getCustomerById(id)
        .then((result) => {
            setEditName(result.firstName);
            setEditLastName(result.lastName);
            setEditEmail(result.email);
            setEditEmployeeId(result.employeeID);
            setEditId(id); // for update
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleUpdate = () => {
        const customerData = {
            id: editId,
            firstName: editName,
            lastName: editLastName,
            email: editEmail,
            employeeID: editEmployeeId
        };
        
        updateCustomer(editId, customerData)
            .then(() => {
                getData();
                clear();
                toast.success('Updated successfully');
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete the Customer?')) {
            deleteCustomer(id)
            .then((result) => {
                if (result === true) {
                    toast.success('Customer was successfully deleted');
            }
            getData();
            })
            .catch((error) => {
                console.log(error);
            });
        }
};
    


const handleSave = async () => {
    const added = await addCustomer(id, name, lastName, email, employeeId);

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
        setName('');
        setId('');
        setLastName('');
        setEmail('');
        setEmployeeId('');
        setEditName('');
        setEditLastName('');
        setEditEmail('');
        setEditId('');
        setEditEmployeeId('');
    }

    return(
        <Fragment>
            <ToastContainer/>
            <Container> ⠀⠀⠀
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter id" 
                    value={id} onChange={(e) => setId(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter firstName" 
                    value={name} onChange={(e) => setName(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter lastName"
                    value={lastName} onChange={(e) => setLastName(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter email"
                    value={email} onChange={(e) => setEmail(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter empId"
                    value={employeeId} onChange={(e) => setEmployeeId(e.target.value) }/></Col>
                    <Col><button className="btn btn-success" onClick={() => handleSave()}>Submit</button></Col>
                </Row>
            </Container>⠀⠀⠀⠀
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>EmployeeID</th>
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
                                        <td>{item.email}</td>
                                        <td>{item.employeeID}</td>
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
                            value={editEmail} onChange={(e) => setEditEmail(e.target.value) }/></Col>
                            <Col><input type="text" className="form-control" placeholder="Enter empId"
                            value={editEmployeeId} onChange={(e) => setEditEmployeeId(e.target.value) }/></Col>
                            </Row>
                        </Container>
                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
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