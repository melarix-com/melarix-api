// ========== Running the server
console.log('server.js load')
const app = require('./app/app')
//var env = require('dotenv').config()
const port = process.env.PORT || 3005;


app.listen(port, async () => { 
      console.log(`Example app listening on port =>> ${port}!`);
});