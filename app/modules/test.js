
const express = require('express')
const app = express()


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
module.exports = app
