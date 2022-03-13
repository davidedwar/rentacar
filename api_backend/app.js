const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const ItemRoutes = require('./routes/Items');
const UsersRoutes = require('./routes/Users');
const User = require('./models/Users');
const Items = require('./models/Items');
require('dotenv').config();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use("/", ItemRoutes);
app.use("/", UsersRoutes);
app.use("/uploads",express.static('uploads'));
app.use(expressValidator());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }))



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
  const upload = multer({ storage: storage })

  app.post('/items/uploadImage', upload.single('photo'), function (req, res) {
    const photo = req.file.filename;

    console.log(req.file);
    console.log(req.file.filename);
    console.log(req.body);
    // const userId = req.body.userId;
    Items.findOne({
      _id: req.body.itemId
    }, function(err, item){
      if(err){
        return res.json({err})
      }
      else{
          let imagesArr = item.images
          let newImagesArr = [...imagesArr, photo];
          Items.findByIdAndUpdate(req.body.itemId,{images: newImagesArr},(err,image)=>{
            if(err){
                console.log(err);
                return err;
            }
            else{
                return image;
            }
        })
      }
    res.json({})
  })
  });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('DB CONNECTED'));

mongoose.connection.on("error", err => {
    console.log(`DB CONNECTION ERROR : ${err.message}`);
});

const port = 5000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
})

