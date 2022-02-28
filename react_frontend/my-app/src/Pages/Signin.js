import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import '../stylesheets/signinStyle.css';
import Auth from '../services/Auth';
import {login} from "../reducers/user";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// usedispatch is used to modify values of the states
// useselector is used to access values of the states

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const api = 'http://localhost:5000';


export default function Signin() {
  const [userInfo, setUserInfo] = React.useState({ email: "", password: ""});
  const [errorMessage, setErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state)=> state.user.value)
  const dispatch = useDispatch()


  const handleClick = () => {
    setOpen(true);
  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    console.log(userInfo, "userinfooo");
     dispatch(login({email: userInfo.email, password: userInfo.password}));
     console.log(user.email);
     if(userInfo.email == ""){
      setErrorMessage("email cannot be empty");
      setOpen(true);
     }
     else if(userInfo.password == ""){
      setErrorMessage("password cannot be empty");
      setOpen(true);
     }
     else
     Auth.login(userInfo.email, userInfo.password)
        .then((res)=>{
            // window.location.reload();
            console.log("bruh in");
            if(res.error=="email"){
              setErrorMessage("email does not exist, please sign up");
              setOpen(true);
            }
            else if(res.error == "password"){
              setErrorMessage("incorrect password");
              setOpen(true);
            }
        }).catch((err)=>{
                console.log(err);
        })
    }


  return (
    <React.Fragment>
    <Card id = "cardContainer">
    <Card.Header id = "cardTitle">Welcome back!</Card.Header>
    <Card.Body>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <TextField onChange = {(e)=>{
        setUserInfo({...userInfo, email: e.target.value});
      }}id="standard-basic" label= "Email" variant="standard" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <TextField onChange = {(e)=>{
        setUserInfo({...userInfo, password: e.target.value});
      }}
      id="standard-basic" label="Password" variant="standard" />
    </Form.Group>
    <Button onClick={onSubmit} id="submitButton"  type="submit">
      Sign in
    </Button>
  </Form>
  {/* <div>{user.email}</div> */}
      </Card.Body>
  </Card>
  <div id="signinSnackbarErrorDiv">
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert id="signinSnackbarError" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
      </Alert>
      </Snackbar>
    </div>
  </React.Fragment>
  
  );
}
/// need to push to git
/// need to create - home page - upload car page, edit car page, edit profile page