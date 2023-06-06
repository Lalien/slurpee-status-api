var location         = {};
var mongoose         = require("mongoose");
const uri            = `mongodb://127.0.0.1:27017/slurpee-status?maxPoolSize=20&w=majority`;

const locationSchema  = new mongoose.Schema({
    name    : String,
    approved: Boolean
});
const Location        = mongoose.model('Location', locationSchema);


location.getLocations = async function() {
    await mongoose.connect(uri);
    let locations = await Location.find();
    return {
        statusCode: 200,
        body: JSON.stringify(locations)
    }
};

location.createLocation = async function(event) {
    await mongoose.connect(uri);
    let checkExistingLocation = await Location.find({name: event.name});
    if (checkExistingLocation.length == 0) {
        let newLocation    = new Location({name: event.name, approved: false});
        let creationResult = await newLocation.save();
        if (typeof creationResult == 'object') {
            statusCode = 200;
            message    = "The location has been submitted for review";
        } else {
            statusCode = 500;
            message    = "There was an error";
        }
    } else {
        statusCode = 500;
        message    = "This location already exists or has already been sent in for approval.";
    }

    return {
        statusCode: statusCode,
        body: JSON.stringify({
            message: message
        })
    };
};

module.exports = location;