console.log("Hello World")
const express = require("express");
const app = express();
var env = require('dotenv').config()
const port = process.env.PORT || 3005;
const cors = require('cors');

app.use(cors({
      origin: 'http://localhost:3000'
}));


app.use(function (req, res, next) {

      const origin = req.headers.origin;
      const host = req.headers.host;
      console.log('origin: ' + origin)
      console.log('host: ' + host)

      // if (acceptedUrlArray.includes(origin)) {
      //       accept = origin
      // }
      // if (acceptedUrl == host) {
      //       accept = host
      // }
      // console.log('req.headers.origin: ')
      // console.log(req.headers)
      // console.log('accept: ' + accept)
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
});
//#region  ========== Record Visit
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.post('/recordvisit', async (req, res) => {
      console.log('record visit started')
      console.log(req.hostname)

      try {
            // console.log(req.body)
            console.log(JSON.stringify(req.body));
            return res.status(200).json({
                  status: "success"
            });
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
      console.log(`Example app listening on port ${port}!`);
});