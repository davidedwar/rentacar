import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Auth from '../services/Auth';
import {login} from "../reducers/user";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../stylesheets/uploadImagesStyles.css';

// usedispatch is used to modify values of the states
// useselector is used to access values of the states

const api = 'http://localhost:5000';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Signin() {
  const [firstImage, setFirstImage] = useState({ preview: '', data: '' })
  const [secondImage, setSecondImage] = useState({ preview: '', data: '' })
  const [thirdImage, setThirdImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault();
        const formData = new FormData();
        
        console.log("sace");
        // console.log(image.data, "boooo");
        formData.append('photo', firstImage.data)
        // formData.append('photo', secondImage.data)
        // formData.append('photo', thirdImage.data)
        formData.append('itemId', "621522a15b63d90b44bc11d3");

        axios.post('http://localhost:5000/items/uploadImage/', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
        if(secondImage){
          handleSecondImage();
        }
    }
    const handleSecondImage = async () => {
      // e.preventDefault();
        const formData = new FormData();
        
        console.log("sace");
        // console.log(image.data, "boooo");
        // formData.append('photo', firstImage.data)
        formData.append('photo', secondImage.data)
        // formData.append('photo', thirdImage.data)
        formData.append('itemId', "621522a15b63d90b44bc11d3");

        axios.post('http://localhost:5000/items/uploadImage/', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
        if(thirdImage){
          handleThirdImage();
        }
    }
    const handleThirdImage = async () => {
      // e.preventDefault();
        const formData = new FormData();
        
        console.log("sace");
        formData.append('photo', thirdImage.data)
        formData.append('itemId', "621522a15b63d90b44bc11d3");

        axios.post('http://localhost:5000/items/uploadImage/', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }

  const handleFirstFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    console.log(e.target.files[0]);
    setFirstImage(img)
  }
  const handleSecondFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    console.log(e.target.files[0]);
    setSecondImage(img)
  }
  const handleThirdFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    console.log(e.target.files[0]);
    setThirdImage(img)
  }

/// if user selects, search is much easier. u will cover all, and looks better 

  return (
    <React.Fragment>
      {/* <div id = "titleDiv" >Add your car</div> */}
      <Card id = "uploadCarCard">
      <Card.Header id = "cardTitle">
        Upload Images
      </Card.Header>
      <Card.Body>
          <Row  >
          <Col sm = {3}>
            <form style={{marginTop: "3vw",  marginLeft: "6vw"}} onSubmit={handleSubmit}>
              <input type='file' name='file' onChange={handleFirstFileChange}></input>
            </form>
          </Col>
          <Col sm = {9}>
            {firstImage.preview && <img style={{marginTop: "1vw", marginLeft: "22vw"}} src={firstImage.preview} width='100' height='100' />}
          </Col>
          </Row>
          <Row  >
          <Col sm = {3}>
            <form style={{marginTop: "3vw",  marginLeft: "6vw"}} onSubmit={handleSubmit}>
              <input type='file' name='file' onChange={handleSecondFileChange}></input>
            </form>
          </Col>
          <Col sm = {9}>
            {secondImage.preview && <img style={{marginTop: "1vw", marginLeft: "22vw"}} src={secondImage.preview} width='100' height='100' />}
          </Col>
          </Row>
          <Row  >
          <Col sm = {3}>
            <form style={{marginTop: "3vw",  marginLeft: "6vw"}} onSubmit={handleSubmit}>
              <input type='file' name='file' onChange={handleThirdFileChange}></input>
            </form>
          </Col>
          <Col sm = {9}>
            {thirdImage.preview && <img style={{marginTop: "1vw", marginLeft: "22vw"}} src={thirdImage.preview} width='100' height='100' />}
          </Col>
          </Row>
          <Button id="uploadSubmitButton"  type="submit" onClick = {handleSubmit}>
            Next
          </Button>
      </Card.Body> 
    </Card>

    </React.Fragment>
  
  );
}

