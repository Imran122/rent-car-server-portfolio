const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    rentCarDataId: {
        type: mongoose.Types.ObjectId,
        ref: "rentCarData",
        required: true
    }
      
},{ timestamps: true, versionKey:false })

const favourite = mongoose.model('favourite', DataSchema, 'favourites');
module.exports = favourite;