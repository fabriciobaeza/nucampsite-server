const mongoose = require('mongoose'); //Import mongoose middleware
const Schema = mongoose.Schema; //Using the Schema object

require('mongoose-currency').loadType(mongoose); // Defining a schema type for currency
const Currency = mongoose.Types.Currency;// using the currency middleware

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

//Declaring a new Schema
//Blueprint of your document
const campsiteSchema = new Schema({
    //Json object , key/value pair, {key: value}
    name: {
        type: String, //type of data or input
        required: true, // meaning when a user makes a post request, that it should include the json object with the key name " name"
        unique: true// this attribute is unique meaning no others like it in your database
    },
    description: {
        type: String,
        required: true// a user when making a post request must include a json object containing this exact key. 
    },
    image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema] //this is a sub-document
}, {
    timestamps: true
});

// mongoose will automatically look for the plural of the first parameter
//2nd parameter is your main schema/document
const Campsite = mongoose.model('Campsite', campsiteSchema) 

module.exports = Campsite;// need to export otherwise we cant use it when querying our database