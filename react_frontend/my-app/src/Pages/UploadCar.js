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

const colors = ["green","yellow","light-blue","dark-blue","black","red","beige","silver","grey","brown","burgundy","cream"];
const getModels = (Manufacturer)=>{
    switch(Manufacturer){
      case "Toyota":
        return ["Avalon", "Avanza", "Camry", "Corolla", "Echo", "FJ Cruiser", "Fortuner", "Hiace", 
        "Highlander", "Innova", "Land Cruiser", "Prado", "Previa", "RAV 4", "Sequoia", "Sienna", "Tundra", "Tacoma", "Yaris"]
      case "Honda":
        return ["Accord", "CR-V", "City", "Civic", "HR-V", "Odyssey", 
        "Pilot", "Van"]
      case "Audi":
        return ["A1", "A3", "A4", "A5", "A6", "A7", 
        "A8", "Q2", "Q3", "Q5", "Q7", "Q8","R8","S3/RS3","S4/RS4","S5/RS5","S6/RS6","S7/RS7","S8","TT","e-tron"]
      case "BMW":
        return ["1-series", "1M", "2-Series", "3-Series", "4-Series", "5-Series", 
        "6-Series", "7-Series", "8-Series", "M-Roadster", "M2", "M3","M4","M5","M6","M8","X1","X2","X3","X4","X5",
      "X6","X7","Z3","Z4","Z8","i3","i8"]
      case "Chevrolet":
        return ["Astro", "Avalanche", "Aveo", "Camaro", "Caprice", "Captiva", 
        "Corvette", "Cruze", "Impala", "Malibu", "Silverado", "Spark","Suburban","Taho","Trailblazer","Traverse","Trax"]
      case "Ford":
        return ["Bronco", "Ecosport", "Edge", "Escape", "Expedition", "Explorer", 
        "F-Series Pickup", "Fiesta", "Figo", "Focus", "Fusion", "Mustang","Pickup","Ranger","Shelby","Taurus","Van"]
      case "Hyundai":
        return ["Accent", "Azera", "Elantra", "Genesis", "H1", "Kona", 
        "Santa Fe", "Sonata", "Tucson", "Veloster", "Veracruz", "i10","i20","i30","i40"]
      case "Kia":
        return ["Cadenza", "Carens", "Carnival", "Cerato", "k5", "Mohave", 
        "Oprius", "Optima", "Picanto", "Rio", "Sedona", "Sorento" ,"Soul","Sportage","Stinger"]
      case "Land Rover":
        return ["Defender", "Discovery", "Discovery Sport", "LR2", "LR4", "LR5", 
        "Range Rover", "Range Rover Evoque", "Range Rover Evoque", "Range Rover Velar"]
      case "Lexus":
        return ["CT-Series", "ES-Series", "GS-Series", "GX-Series", "IS-C", "IS-F", 
        "IS-Series", "LC 500", "LM 300", "LS-Series", "LX-Series", "LX600", "NX 200t", "NX 300", "RC", "RX-Series"]
      case "Mercedes-Benz":
        return ["240/260/280", "300/350/380", "500/560", "A-Class", "A200", "AMG", 
        "AMG GT 4 doors", "C-Class", "C-Class Coupe", "C43", "CL-Class", "CLA", "CLK-Class", "CLS-Class", "E-Class", "E-Class Coupe"
        , "G-Class", "GL-Class", "GLA", "GLC", "GLE Coupe", "GLE SUV", "GLE-Class", "GLK-Class", "GLS", "GLS-Class", "GT", "M-Class", "R-Class", "S-Class"
      ,"S-Class Coupe", "SL-Class", "SLK-Class", "Sprinter","V-Class"]
      case "Mitsubishi":
        return ["ASX", "Attrage", "Canter", "Eclipse", "EclipseCross", "Galant", 
        "L200", "Lancer", "Mirage", "Montero", "Montero Sport", "Outlander", "Pajero", "Pajero Sport", "Xpander"]
      case "Nissan":
        return ["Altima", "Armada", "GT-R", "Juke", "Kicks", "Maxima", 
        "Micra", "Murano", "Navara", "Pathfinder", "Patrol", "Pickup", "Qashqai", "Rogue", "Sentra", "Sunny"
        , "Tiida", "Van", "X-Trail", "Xterra"]
      case "Renault":
        return ["Captur", "Dokker", "Duster", "Fluence", "Koleos", "Logan", 
        "Megane", "Safrane", "Symbol", "Talisman", "Twizy"]
      case "Volkswagen":
        return ["Beetle", "CC", "Caddy", "GTI", "Golf", "Golf R", 
        "Jetta", "Passat", "Polo", "Scirocco", "Tiguan", "Touareg", "Transporter"]
    }
  };



export default function Signin() {
  const [searchFilters, setSearchFilters] = React.useState({});
  const [curMakeModels, setCurMakeModels] = React.useState(["boo","eweww","ewwe"]);
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


    useEffect(() => {
        console.log(carInfo.make, "yooo hereee");
        setCurMakeModels(getModels(carInfo.make));
        
    }, [carInfo.make]);
    

    // make: "",
    // model: "",
    // year: "",
    // dailyRent: "",
    // color: "", 
    // isAvailable: "",
    // photos: ""
const submitCar = (e) => {
  e.preventDefault();
  /// need to check for unchosen shit 
  /// need to axios post the car
  /// need to add the user details from the store in the axios request
  axios.post(api + "/items/addItem", {
        make: carInfo.make,
        model: carInfo.model,
        year: carInfo.year,
        dailyRent: carInfo.dailyRent,
        color: carInfo.color,
      })
      .then(response => {
        console.log(response)
      })
  }
const fileSelectHandler = (event) => {
  setCarInfo({...carInfo, make: event.target.value});
  console.log(event.target.value, "heereee");
};

const handleMakeChange = (event) => {
   setCarInfo({...carInfo, make: event.target.value});
   console.log(event.target.value, "heereee");
};
const handleModelChange = (event) => {
   setCarInfo({...carInfo, model: event.target.value});
   console.log(event.target, "heereee");
};
const handleYearChange = (event) => {
   setCarInfo({...carInfo, year: event.target.value});
   console.log(event.target.value, "heereee");
};
const handleColorChange = (event) => {
   setCarInfo({...carInfo, color: event.target.value});
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
      <Card id = "uploadCarCard">
      <Card.Header id = "cardTitle">List your Car!</Card.Header>
      <Card.Body>
      <Form>
      <Container>
      <Row>
          <Col sm = {6}>
          <FormControl id = "makeControl" variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                    <MenuItem value="Honda">Honda</MenuItem>
                    <MenuItem value="Kia">Kia</MenuItem>
                    <MenuItem value="Land Rover">Land Rover</MenuItem>
                    <MenuItem value="Lexus">Lexus</MenuItem>
                    <MenuItem value="Mercedes-Benz">Mercedes-Benz</MenuItem>
                    <MenuItem value="Mitsubishi">Mitsubishi</MenuItem>
                    <MenuItem value="Nissan">Nissan</MenuItem>
                    <MenuItem value="Porsche">Porsche</MenuItem>
                    <MenuItem value="Renault">Renault</MenuItem>
                    <MenuItem value="Toyota">Toyota</MenuItem>
                    <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                    </Select>
              </FormControl>
          </Col>
          <Col sm = {6}>
          <FormControl id = "modelControl" variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Model</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value = {carInfo.model}
                    onChange={handleModelChange}
                    label="Model"
                    >
                        {curMakeModels? curMakeModels.map((model,key) => (<MenuItem value={curMakeModels[key]} key={key} className='station'>{model}</MenuItem> )): <MenuItem></MenuItem>}
                </Select>
              </FormControl>
          </Col>
          </Row>
          <Row>
          <Col sm = {6}>
          <FormControl id = "yearControl" variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={carInfo.year}
                    onChange={handleYearChange}
                    label="Year"
                    style={{maxHeight: '50%', overflow: 'auto'}}
                    >
                    <MenuItem value= "2010">2010</MenuItem>
                    <MenuItem value= "2011">2011</MenuItem>
                    <MenuItem value= "2012">2012</MenuItem>
                    <MenuItem value= "2013">2013</MenuItem>
                    <MenuItem value= "2014">2014</MenuItem>
                    <MenuItem value= "2015">2015</MenuItem>
                    <MenuItem value= "2016">2016</MenuItem>
                    <MenuItem value= "2017">2017</MenuItem>
                    <MenuItem value= "2018">2018</MenuItem>
                    <MenuItem value= "2019">2019</MenuItem>
                    <MenuItem value= "2020">2020</MenuItem>
                    <MenuItem value= "2021">2021</MenuItem>
                    <MenuItem value= "2022">2022</MenuItem>
                    </Select>
              </FormControl>
          </Col>
      
      
          <Col sm = {6}>
          <FormControl id = "colorControl" variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Color</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value = {carInfo.color}
                    onChange={handleColorChange}
                    label="Color"
                    >
                        {colors.map((color,key) => (<MenuItem value={colors[key]} key={key} className='station'>{color}</MenuItem> ))}
                </Select>
              </FormControl>
          </Col>
          </Row>
          <Row>
          <Col sm = {6}>
          <FormControl id = "rentControl" variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                id="filled-number"
                label="Daily Rent (AED)"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              </FormControl>
          </Col>
          <Col sm = {6}>
          <FormControl id = "descriptionControl" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <TextField size = "large" onChange = {(e)=>{
                    //   setUserInfo({...userInfo, companyAddress: e.target.value});
                  }}
                  id="standard-basic" label="Description (optional)" variant="standard" />
         
              </FormControl>
          </Col>
      </Row>
      </Container>
      {/* <Button onClick={onSubmit} id="signupSubmitButton"  type="submit">
        Register
      </Button> */}
    </Form>
    <Button onClick={submitCar} id="uploadSubmitButton"  type="submit"> 
      Next
    </Button>
        </Card.Body>
    </Card>

    </React.Fragment>
  
  );
}


/// need to publish the states and link to next page
/// error if anything is empty
