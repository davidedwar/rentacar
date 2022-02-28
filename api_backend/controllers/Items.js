const Item = require('../models/Items');
const User = require('../models/Users');


/// visitor function
const getItems = (req,res)=>{
  Item.find({},(err,items)=>{
     if(err){
        res.status(500).send({message: 'Could not show items'});
     }
     res.send(items);
  })
};
const getModels = (req,res)=>{
  switch(req.body.Manufacturer){
    case "Toyota":
      return res.json({models: ["Avalon", "Avanza", "Camry", "Corolla", "Echo", "FJ Cruiser", "Fortuner", "Hiace", 
      "Highlander", "Innova", "Land Cruiser", "Prado", "Previa", "RAV 4", "Sequoia", "Sienna", "Tundra", "Tacoma", "Yaris", ""]})
    case "Honda":
      return res.json({models: ["Accord", "CR-V", "City", "Civic", "HR-V", "Odyssey", 
      "Pilot", "Van"]})
    case "Audi":
      return res.json({models: ["A1", "A3", "A4", "A5", "A6", "A7", 
      "A8", "Q2", "Q3", "Q5", "Q7", "Q8","R8","S3/RS3","S4/RS4","S5/RS5","S6/RS6","S7/RS7","S8","TT","e-tron"]})
    case "BMW":
      return res.json({models: ["1-series", "1M", "2-Series", "3-Series", "4-Series", "5-Series", 
      "6-Series", "7-Series", "8-Series", "M-Roadster", "M2", "M3","M4","M5","M6","M8","X1","X2","X3","X4","X5",
    "X6","X7","Z3","Z4","Z8","i3","i8"]})
    case "Chevrolet":
      return res.json({models: ["Astro", "Avalanche", "Aveo", "Camaro", "Caprice", "Captiva", 
      "Corvette", "Cruze", "Impala", "Malibu", "Silverado", "Spark","Suburban","Taho","Trailblazer","Traverse","Trax"]})
    case "Ford":
      return res.json({models: ["Bronco", "Ecosport", "Edge", "Escape", "Expedition", "Explorer", 
      "F-Series Pickup", "Fiesta", "Figo", "Focus", "Fusion", "Mustang","Pickup","Ranger","Shelby","Taurus","Van"]})
    case "Hyundai":
      return res.json({models: ["Accent", "Azera", "Elantra", "Genesis", "H1", "Kona", 
      "Santa Fe", "Sonata", "Tucson", "Veloster", "Veracruz", "i10","i20","i30","i40"]})
    case "Kia":
      return res.json({models: ["Cadenza", "Carens", "Carnival", "Cerato", "k5", "Mohave", 
      "Oprius", "Optima", "Picanto", "Rio", "Sedona", "Sorento" ,"Soul","Sportage","Stinger"]})
    case "Land Rover":
      return res.json({models: ["Defender", "Discovery", "Discovery Sport", "LR2", "LR4", "LR5", 
      "Range Rover", "Range Rover Evoque", "Range Rover Evoque", "Range Rover Velar"]})
    case "Lexus":
      return res.json({models: ["CT-Series", "ES-Series", "GS-Series", "GX-Series", "IS-C", "IS-F", 
      "IS-Series", "LC 500", "LM 300", "LS-Series", "LX-Series", "LX600", "NX 200t", "NX 300", "RC", "RX-Series"]})
    case "Mercedes-Benz":
      return res.json({models: ["240/260/280", "300/350/380", "500/560", "A-Class", "A200", "AMG", 
      "AMG GT 4 doors", "C-Class", "C-Class Coupe", "C43", "CL-Class", "CLA", "CLK-Class", "CLS-Class", "E-Class", "E-Class Coupe"
      , "G-Class", "GL-Class", "GLA", "GLC", "GLE Coupe", "GLE SUV", "GLE-Class", "GLK-Class", "GLS", "GLS-Class", "GT", "M-Class", "R-Class", "S-Class"
    ,"S-Class Coupe", "SL-Class", "SLK-Class", "Sprinter","V-Class"]})
    case "Mitsubishi":
      return res.json({models: ["ASX", "Attrage", "Canter", "Eclipse", "EclipseCross", "Galant", 
      "L200", "Lancer", "Mirage", "Montero", "Montero Sport", "Outlander", "Pajero", "Pajero Sport", "Xpander"]})
    case "Nissan":
      return res.json({models: ["Altima", "Armada", "GT-R", "Juke", "Kicks", "Maxima", 
      "Micra", "Murano", "Navara", "Pathfinder", "Patrol", "Pickup", "Qashqai", "Rogue", "Sentra", "Sunny"
      , "Tiida", "Van", "X-Trail", "Xterra"]})
    case "Renault":
      return res.json({models: ["Captur", "Dokker", "Duster", "Fluence", "Koleos", "Logan", 
      "Megane", "Safrane", "Symbol", "Talisman", "Twizy"]})
    case "Volkswagen":
      return res.json({models: ["Beetle", "CC", "Caddy", "GTI", "Golf", "Golf R", 
      "Jetta", "Passat", "Polo", "Scirocco", "Tiguan", "Touareg", "Transporter"]})
  }
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

module.exports = {getItems, addItems, deleteItems, updateItemDetails, viewMyPostings};