import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import '../stylesheets/signupStyle.css';
import axios from 'axios';
import Auth from '../services/Auth';
import {login} from "../reducers/user";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../stylesheets/uploadCarStyle.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// usedispatch is used to modify values of the states
// useselector is used to access values of the states

const api = 'http://localhost:5000';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Signin() {
  const [searchFilters, setSearchFilters] = React.useState({});
  const [curMakeModels, setCurMakeModels] = React.useState([]);
  const [carInfo, setCarInfo] = React.useState({ 
    make: "",
    model: "",
    year: "",
    dailyRent: "",
    color: "", 
    isAvailable: "",
    photos: ""
});
const [open, setOpen] = React.useState(false);
const [errorMessage, setErrorMessage] = React.useState("");

const [age, setAge] = React.useState('');

const handleMakeChange = (event) => {
    setCarInfo({...carInfo, make: event.target.value});
   console.log(event.target.value, "heereee");
};

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

/// if user selects, search is much easier. u will cover all, and looks better 

  return (
    <React.Fragment>
      {/* <div id = "titleDiv" >Add your car</div> */}
      <Card id = "signupCard">
      <Card.Header id = "cardTitle">List your Car!</Card.Header>
      <Card.Body>
      <Form>
      <Container>
      <Row>
          <Col sm = {4}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Manufacturer</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={carInfo.make}
                    onChange={handleMakeChange}
                    label="Make"
                    style={{maxHeight: '50%', overflow: 'auto'}}
                    >
                    <MenuItem value= "Audi">Audi</MenuItem>
                    <MenuItem value="BMW">BMW</MenuItem>
                    <MenuItem value="Chevrolet">Chevrolet</MenuItem>
                    <MenuItem value="Dodge">Dodge</MenuItem>
                    <MenuItem value="Ford">Ford</MenuItem>
                    <MenuItem value="Hyundai">Hyundai</MenuItem>
                    <MenuItem value="Kia">Kia</MenuItem>
                    <MenuItem value="LandRover">Land Rover</MenuItem>
                    <MenuItem value="Mercedes-Benz">Mercedes-Benz</MenuItem>
                    <MenuItem value="Mitsubishi">Mitsubishi</MenuItem>
                    <MenuItem value="Nissan">Nissan</MenuItem>
                    <MenuItem value="Porsche">Porsche</MenuItem>
                    <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                    <MenuItem value="Toyota">Toyota</MenuItem>
                    </Select>
              </FormControl>
          </Col>
          <Col sm = {4}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Make</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={carInfo.make}
                    onChange={handleMakeChange}
                    label="Make"
                    >
                    <MenuItem value= "Audi">Audi</MenuItem>
                    <MenuItem value="BMW">BMW</MenuItem>
                    <MenuItem value="Chevrolet">Chevrolet</MenuItem>
                    <MenuItem value="Dodge">Dodge</MenuItem>
                    <MenuItem value="Ford">Ford</MenuItem>
                    <MenuItem value="Hyundai">Hyundai</MenuItem>
                    <MenuItem value="Kia">Kia</MenuItem>
                    <MenuItem value="LandRover">Land Rover</MenuItem>
                    <MenuItem value="Mercedes-Benz">Mercedes-Benz</MenuItem>
                    <MenuItem value="Mitsubishi">Mitsubishi</MenuItem>
                    <MenuItem value="Nissan">Nissan</MenuItem>
                    <MenuItem value="Porsche">Porsche</MenuItem>
                    <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                    <MenuItem value="Toyota">Toyota</MenuItem>
                    </Select>
              </FormControl>
          </Col>
          <Col sm = {4}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <TextField onChange = {(e)=>{
                    //   setUserInfo({...userInfo, phone: e.target.value});
                  }}
                  id="standard-basic" label="Phone number (10 digits)" variant="standard" />
              </Form.Group>
          </Col>
      </Row>
      <Row>
          <Col sm = {6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField onChange = {(e)=>{
                    //   setUserInfo({...userInfo, email: e.target.value});
                  }}id="standard-basic" label= "Email" variant="standard" />
              </Form.Group>
          </Col>
          <Col sm = {6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <TextField onChange = {(e)=>{
                    //   setUserInfo({...userInfo, password: e.target.value});
                  }}
                  id="standard-basic" label="Password" variant="standard" />
              </Form.Group>
          </Col>
      </Row>
      <Row>
          <Col sm = {6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField onChange = {(e)=>{
                    //   setUserInfo({...userInfo, companyName: e.target.value});
                  }}id="standard-basic" label= "Company Name" variant="standard" />
              </Form.Group>
          </Col>
          <Col sm = {6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <TextField onChange = {(e)=>{
                    //   setUserInfo({...userInfo, companyAddress: e.target.value});
                  }}
                  id="standard-basic" label="Company Address" variant="standard" />
              </Form.Group>
          </Col>
      </Row>
      </Container>
      {/* <Button onClick={onSubmit} id="signupSubmitButton"  type="submit">
        Register
      </Button> */}
    </Form>
        </Card.Body>
    </Card>

    </React.Fragment>
  
  );
}