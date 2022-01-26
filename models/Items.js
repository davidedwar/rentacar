const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const ItemSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: "Name is required"
    },
    Price: {
        type: Number,
        required: "You should enter a price"
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    Description: {
        type: String,
        minlength: 50,
        maxlength: 150
    },
    postedBy: {
        type: ObjectId,
        ref: "user"
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Item", ItemSchema);