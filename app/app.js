console.log("Hello World")
const express = require("express");
const app = express();

const cors = require('cors');




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


var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(require('./modules/visit'));
app.use(require('./modules/email'));
app.use(require('./modules/test'));







module.exports = app   
