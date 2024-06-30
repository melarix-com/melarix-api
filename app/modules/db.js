var env = require('dotenv').config()

//#region Database Setup
const { MongoClient, ObjectId } = require("mongodb");
// const dburi = "mongodb://localhost:27017/";
const dburi = process.env.dburl;

var client, db, co;

function open(collection) {
      client = new MongoClient(dburi);
      db = client.db('mldb')
      co = db.collection(collection)
}
async function close() {
      await client.close();
}
async function collection() {
      return co;
}
function objectify(id) {
      //let obj = new ObjectId(id)
      return { _id: new ObjectId(id) }
}

module.exports = { open, close, collection, objectify }


//#endregion

