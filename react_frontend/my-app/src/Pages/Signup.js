import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import '../stylesheets/signupStyle.css';
import Auth from '../services/Auth';
import {login} from "../reducers/user";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const api = 'http://localhost:5000';


export default function Signup() {
  const [userInfo, setUserInfo] = React.useState({ 
    email: "",
    password: "",   
    name: "",
    phone: "",
    companyName: "",
    companyAddress: ""
});
const [open, setOpen] = React.useState(false);
const [errorMessage, setErrorMessage] = React.useState("");

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const user = useSelector((state)=> state.user.value)
const dispatch = useDispatch()


  const onSubmit = (e) =>{
    e.preventDefault();
    if(userInfo.name == ""){
        setErrorMessage("Owner name cannot be empty");
        setOpen(true);
    }
    else if(userInfo.phone == ""){
        setErrorMessage("phone number cannot be empty");
        setOpen(true);
    }
    else if(userInfo.email == ""){
        setErrorMessage("email cannot be empty");
        setOpen(true);
    }
    else if(userInfo.password == ""){
        setErrorMessage("password name cannot be empty");
        setOpen(true);
    }
    else if(userInfo.companyName == ""){
        setErrorMessage("Company name cannot be empty");
        setOpen(true);
    }
    else if(userInfo.companyAddress == ""){
        setErrorMessage("Company address cannot be empty");
        setOpen(true);
    }
    console.log(userInfo, "userinfooo");
    //  dispatch(login({email: userInfo.email, password: userInfo.password}));
    //  console.log(user.email);
      Auth.register(
        userInfo.name, 
        userInfo.email, 
        userInfo.phone, 
        userInfo.password, 
        userInfo.companyName
        )
         .then((res)=>{
            //   window.location.reload();
            // console.log(res.message.driver, "yo")
            console.log("bruh");
            console.log(res);
            if(res.data.err.keyValue.email){
                setErrorMessage("Email already exists, please sign in");
                setOpen(true);
            }
         }).catch((err)=>{
                console.log(err.data.err);
                // if(err.data.err.keyValue.email){
                //     setErrorMessage("email already exists, please signin");
                //     setOpen(true);
                // }
                // console.log(.message);
       })
    }


  return (
<React.Fragment>
    <Card id = "signupCard">
    <Card.Header id = "cardTitle">Welcome!</Card.Header>
    <Card.Body>
    <Form>
    <Container>
    <Row>
        <Col sm = {6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <TextField onChange = {(e)=>{
                    setUserInfo({...userInfo, name: e.target.value});
                }}id="standard-basic" label= "Owner name" variant="standard" />
            </Form.Group>
        </Col>
        <Col sm = {6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <TextField onChange = {(e)=>{
                    setUserInfo({...userInfo, phone: e.target.value});
                }}
                id="standard-basic" label="Phone number (10 digits)" variant="standard" />
            </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col sm = {6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <TextField onChange = {(e)=>{
                    setUserInfo({...userInfo, email: e.target.value});
                }}id="standard-basic" label= "Email" variant="standard" />
            </Form.Group>
        </Col>
        <Col sm = {6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <TextField onChange = {(e)=>{
                    setUserInfo({...userInfo, password: e.target.value});
                }}
                id="standard-basic" label="Password" variant="standard" />
            </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col sm = {6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <TextField onChange = {(e)=>{
                    setUserInfo({...userInfo, companyName: e.target.value});
                }}id="standard-basic" label= "Company Name" variant="standard" />
            </Form.Group>
        </Col>
        <Col sm = {6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <TextField onChange = {(e)=>{
                    setUserInfo({...userInfo, companyAddress: e.target.value});
                }}
                id="standard-basic" label="Company Address" variant="standard" />
            </Form.Group>
        </Col>
    </Row>
    </Container>
    <Button onClick={onSubmit} id="signupSubmitButton"  type="submit">
      Register
    </Button>
  </Form>
      </Card.Body>
  </Card>
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert id="snackbarError" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
    </Alert>
    </Snackbar>
</React.Fragment>
    
  );
}
