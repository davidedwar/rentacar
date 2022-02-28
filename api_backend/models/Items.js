const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const ItemSchema = new mongoose.Schema({
    make: {
        type: String,
        required: "Make is required"
    },
    model: {
        type: String,
        required: "Model is required"
    },
    year: {
        type: Number, 
        required: "year is required"
    },
    price: {
        type: Number,
        required: "You should enter a price"
    },
    isRented: {
        type: Boolean,
        default:false
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 150
    },
    created: {
        type: Date,
        default: Date.now()
    },

})

ItemSchema.virtual('myNotes', {
    ref: '',
    localField: '_id' ,
    foreignField: 'id',
  })
// either the user refs the post
// or the post refs the user 
// 

module.exports = mongoose.model("Item", ItemSchema);