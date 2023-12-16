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

const Brand = () =>{
    //boot
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [isActive, setisActive] = useState("");

    const [editId, setEditId] = useState("");
    const [editName, setEditName] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editIsActive, setEditIsActive] = useState("");

    useEffect(()=>{
        getData();
    },[])

    //винести в окремий файл
    const getData = () => {
        axios.get('http://localhost:5120/api/Brand')
        .then((result) =>{
            setData(result.data)
            console.log(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    const handleEdit= (id) =>{
        handleShow();
        axios.get(`http://localhost:5120/api/Brand/${id}`)
        .then((result) => {
            setEditName(result.data.name);
            setEditCategory(result.data.category);
            setEditIsActive(result.data.isActive);
            setEditId(id); // for update
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleUpdate = () => {
        const url = `http://localhost:5120/api/Brand?id=${editId}`;
        const data = {
            "id" : editId,
            "name": editName,
            "category": editCategory,
            "isActive": editIsActive
        }

        axios.put(url, data)
        .then(() => {
            getData();
            clear();
            toast.success("Updated successfully");
            handleClose();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDelete= (id) =>{
        if(window.confirm('Are u sure u want to delete Brand') == true)
        {
            axios.delete(`http://localhost:5120/api/Brand/${id}`)
            .then((result) => {
                if(result.status === 200){
                    toast.success('Brand was successfully deleted')
                }
                getData();
            })
            .catch((error) => {
                console.log(error);
            })

        }
        
    }


    const handleSave = () => {
        const url = 'http://localhost:5120/api/Brand';
        const data = {
            "name": name,
            "category": category,
            "isActive": isActive
        }

        axios.post(url, data)
        .then(() => {
            handleClose();
            getData();
            clear();
            toast.success("New brand is added");
        })
        .catch((error) => {
            console.log(error);
        })

        clear();
    }

    const clear = () => {
        setName('');
        setCategory('');
        setisActive('');
        setEditName('');
        setEditCategory('');
        setEditIsActive('');
        setEditId('');
    }



    return(
        <Fragment>
            <ToastContainer/>
            <Container> ⠀⠀⠀⠀
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter Name" 
                    value={name} onChange={(e) => setName(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter Category"
                    value={category} onChange={(e) => setCategory(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter value"
                    value={isActive} onChange={(e) => setisActive(e.target.value) }/></Col>
                    <Col><button className="btn btn-success" onClick={() => handleSave()}>Submit</button></Col>
                </Row>
            </Container>⠀⠀⠀
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>isActive</th>
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
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.isActive}</td>
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
                            <Col><input type="text" className="form-control" placeholder="Enter Name" 
                            value={editName} onChange={(e) => setEditName(e.target.value) }/></Col>
                            <Col><input type="text" className="form-control" placeholder="Enter Category"
                            value={editCategory} onChange={(e) => setEditCategory(e.target.value) }/></Col>
                            <Col><input type="text" className="form-control" placeholder="Enter value"
                            value={editIsActive} onChange={(e) => setEditIsActive(e.target.value) }/></Col>
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

export default Brand;