
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const register = (req, res) =>{
      console.log(req.body,"yoooo");
      let newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      newUser.save(function(err, user){
        if(err){
          console.log(err,"errr");
          return res.json({err})
        }
        else{
          user.password = undefined;
          return res.json(user);
        }
      })
  }

const signin = (req, res) => {
  console.log(req.body, "req.boddyyyyyyy");
  let {username, email, password} = req.body;
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if(err){
      return res.json({err})
    }
    if(!user){
      return res.json({error : "email"});
    }
    console.log(user, "yooooo");
    
    var result = bcrypt.compareSync(req.body.password, user.password);
    if(!result){
      return res.json({error : "password"});
    }
    let token = jwt.sign({
      email: req.body.email,
      username: req.body.username
    },process.env.SECRET_KEY, {expiresIn: '5h'});
  return res.status(200).send({
      username,
      email,
      token
  });
})
}

  const signout = async (req, res) => {
    try {
      const token = req.headers["token"];
      console.log(token);
      jwt.verify(token, process.env.TOKEN_SECRET);
      return res.json({
        status: 0,
        message: "Success",
      });
    } catch (err) {
      console.log(err);
      return res.json({
        status: 1,
        message: "Error",
      });
    }
  };



const editProfile = (req, res) => {
  const userId = req.body.userId;
  User.findOne({
    _id: req.body.userId
  }, function(err, user){
    if(err){
      return res.json({err})
    }
  const updatedDetails = {
      username: (req.body.username==null? user.username : req.body.username),
      firstName: (req.body.firstName==null? user.firstName : req.body.firstName),
      lastName: (req.body.lastName==null? user.lastName : req.body.lastName),
      phone: (req.body.phone==null? user.phone : req.body.phone),
      email: (req.body.email==null? user.email : req.body.email)
  }
  User.findByIdAndUpdate(userId, updatedDetails, (err, updated) => {  
      if (err) 
        res.status(500).send({message: 'Could not update details'});
      else {
        console.log(`updated: ${updated}`);
        res.send('updated: ' + updated);
      }
    });
  })
}


  module.exports = { signin, signout, register, editProfile};


  // user can signup, signin, view cars, 