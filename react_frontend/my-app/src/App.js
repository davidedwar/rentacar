import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './Pages/Signin';
import UploadCar from './Pages/UploadCar';
import UploadImages from './Pages/UploadImages';
import Signup from './Pages/Signup';


function App() {
  return (
   <div>
     <UploadCar/> 
     {/* <UploadImages/>  */}
     {/* <Navbar/> */}
      {/* <Signin/> */}
      
     {/* <Signup/> */}
   </div>
  );
}

export default App;
/// create the car and send the state of its id into the store.
//  make the route connections 