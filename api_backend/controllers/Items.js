const Item = require('../models/Items');
const User = require('../models/Users');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')



// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })
// var upload = multer({ storage: storage })

const fileFilter = (req, file, cb) =>{
  cb(null, true)
}

// let upload = multer({
//   storage: storage, 
//   fileFilter: fileFilter
// })
// const uploadImages = (upload.array("images",12),(req,res)=>{
//   var response = '<a href="/">Home</a><br>'
//     response += "Files uploaded successfully.<br>"
//     for(var i=0;i<req.files.length;i++){
//         response += `<img src="${req.files[i].path}" /><br>`
//     }
    
//     return res.send(response);
// });
  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, './images/'))
  },
  filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
  }
});

const multiUpload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          const err = new Error('Only .png, .jpg and .jpeg format allowed!')
          err.name = 'ExtensionError'
          return cb(err);
      }
  },
}).array('uploadedImages', 2)

const uploader = (req, res) => {
  multiUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
        return;
    } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == 'ExtensionError') {
            res.status(413).send({ error: { message: err.message } }).end();
        } else {
            res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
        }
        return;
    }

    // Everything went fine.
    // show file `req.files`
    // show body `req.body`
    res.status(200).end('Your files uploaded.');
})
}

/// visitor function
const getItems = (req,res)=>{
  Item.find({},(err,items)=>{
     if(err){
        res.status(500).send({message: 'Could not show items'});
     }
     res.send(items);
  })
};
  

/// renter function
const viewMyPostings = (req, res) => {
  const userId = req.body.userId;
  User.findOne({
    _id: userId
  }, async function(err, user){
    if(err){
      // return user.json({err})
      console.log("errorrroor")
    } 
    let postingsArr = user.postings;
    resultArr = [];
    console.log(postingsArr,"postingsarrrr hereeee");
    for(const itemId of postingsArr){
      console.log(itemId, "item id herreeeee")
      await Item.findById(itemId, function(err, res){
        if(err){
          return res.json({err});
        }
        else{
          console.log(res,"ress heerreee");
          resultArr.push(res);
          console.log(resultArr, "ressss oooo");
        }
      })
    }
  
    console.log(resultArr, "yooooo");
    return res.json({"res" : resultArr});
  })
};

// renter function
const addItems = (req, res) => {  
    // const { images } = req.body;
    const userId = req.body.userId;
    User.findOne({
      _id: req.body.userId
    }, function(err, user){
      if(err){
        return res.json({err})
      } 
      const item = new Item(req.body);
      console.log(userId);
      console.log(user, "heeereeeeee");
      console.log(item);
      item.save()
        .then(result => {
            res.status(200).json({
                post: result
            });
            console.log(result._id);
            let userItems = user.postings;
            let newItems = [...userItems, result._id];
            User.findByIdAndUpdate(userId,{postings: newItems},(err,booking)=>{
              if(err){
                  console.log(err);
                  return err;
              }
              else{
                  return booking
              }
          })
        });
      })
}

/// renter function
const deleteItems = (req, res) => {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    User.findOne({
      _id: userId
    }, function(err, user){
      if(err){
        return res.json({err})
      } 
    let userItems = user.postings;
    let updatedItems = userItems.filter(item => item!=itemId);
    console.log(updatedItems);
          User.findByIdAndUpdate(userId,{postings: updatedItems},(err,booking)=>{
            if(err){
                console.log(err);
                return err;
            }
            else{
                return booking
            }
        })
    Item.findByIdAndDelete(itemId, (err, deleted) => {  
        if (err) 
          res.status(500).send({message: 'Could not delete item'});
        else {
          console.log(`Deleted: ${deleted}`);
          res.send('Deleted: ' + deleted);
        }
      });
    })
}


// renter function
const updateItemDetails = (req, res) => {
    const itemId = req.body.itemId;

    Item.findOne({
      _id: req.body.itemId
    }, function(err, item){
      if(err){
        return res.json({err})
      }
    const updatedItem = {
            isRented: (req.body.isRented==null? item.isRented : req.body.isRented),
            make: (req.body.make==null? item.make : req.body.make), 
            model: (req.body.model ==null? item.model : req.body.model), 
            year: (req.body.year==null? item.year : req.body.year),
            description: (req.body.description==null? item.description : req.body.description),
            price: (req.body.price==null? item.price : req.body.price)
    }
    Item.findByIdAndUpdate(itemId, updatedItem, (err, updated) => {  
        if (err) 
          res.status(500).send({message: 'Could not update item'});
        else {
          console.log(`updated: ${updated}`);
          res.send('updated: ' + updated);
        }
      });
    })
}

module.exports = {getItems, addItems, deleteItems, updateItemDetails, viewMyPostings, uploader};
// module.exports = upload.single('categoryImage');