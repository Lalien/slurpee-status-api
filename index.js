const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb://127.0.0.1:27017/?maxPoolSize=20&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

const locationModel = require("./Models/location.js");

module.exports.getLocations = async (event) => {
  locations = await locationModel.getLocations();
  return locations;
};

module.exports.createLocation = async (event) => {
  locationCreationResult = await locationModel.createLocation(event);
  return locationCreationResult;
}