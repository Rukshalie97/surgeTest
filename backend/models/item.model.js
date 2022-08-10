const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
    note_item: {
        type: String,
        required: true
    },
    note_description: {
        type: String,
        required: true
    }
    ,
    user_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Item', Item);