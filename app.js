console.log("Hello World")
const express = require("express");
const app = express();
var env = require('dotenv').config()
const port = process.env.PORT || 3005;
const cors = require('cors');


//#region Database Setup

const { MongoClient, ObjectId } = require("mongodb");
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



//#endregion



//#region CORS
// if (req.headers.origin == 'https://melarix.com') {
//       app.use(cors({
//             origin: 'https://melarix.com'
//       }));
// }



app.use(function (req, res, next) {
      if (req.headers.origin == 'https://melarix.com') {
            app.use(cors({
                  origin: 'https://melarix.com'
            }));
      }
      const origin = req.headers.origin;
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();

});



//#endregion

//#region  ========== Record Visit
var bodyParser = require('body-parser')
app.use(bodyParser.json());


app.post('/recordvisit', async (req, res) => {
      console.log('record visit started')
      console.log(req.hostname)

      try {
            open('visit')
            // console.log(req.body)
            let record = req.body;
            record.time = new Date(Date.now())
            await co.insertOne(record)
            //console.log(JSON.stringify(req.body));
            close()
            return res.status(200).json({
                  status: "success",
                  data: record
            });
      } catch (error) {
            return res.status(501).json({
                  status: "error",
                  message: error.message
            });
      }


})


app.get('/deletevisit', async (req, res) => {

      console.log('delete a visit --')
      let id = req.query.id.toString();
      console.log('id: ' + id)
      if (req.query.password != process.env.password) {
            console.log('Wrong password')
            return res.status(501).json({
                  status: "error",
                  message: 'Wrong password'
            });
      }
      try {
            open('visit')
            let result = await co.deleteOne({ _id: new ObjectId(id) })
            console.log(result)
            close()
            res.status(200).json({ status: 'success', id: id, result: result })

      } catch (error) {
            return res.status(501).json({
                  status: "error",
                  message: error.message
            });
      }
})

app.get('/getallvisits', async (req, res) => {
      console.log('get all visits --')
      if (req.query.password != process.env.password) {
            console.log('Wrong password')
            return res.status(501).json({
                  status: "error",
                  message: 'Wrong password'
            });
      }
      try {
            open('visit')
            var all = await co.find().toArray()
            close()
            res.status(200).json({ status: 'success', data: all })

      } catch (error) {
            return res.status(501).json({
                  status: "error",
                  message: error.message
            });
      }
})
//#endregion


//#region  ========== Check Status
// CHecks database access status
app.get("/status", async (req, res) => {
      console.log('status check started')
      console.log(req.hostname)
      console.log(req.body)
      try {
            return res.status(200).json({
                  status: "success"
            });
      } catch (error) {
            return res.status(501).json({
                  status: "error",
                  message: error.message
            });
      }

      // var dbStatus = await dbConnect()
      // if (dbStatus) {
      //       console.log('status check: OK - from : ' + req.headers.origin)
      //       console.log('status check: OK - from accept: ' + accept)
      //       return res.status(200).json({
      //             status: "success"
      //       });
      // }
      // console.log('status check: Error')


})

//#endregion




// ========== Running the server
//const server = 
app.listen(port, async () => { //ssss
      console.log(`Example app listening on port =>> ${port}!`);
});