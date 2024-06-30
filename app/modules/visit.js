const express = require('express')
const app = express()
const db = require('./db')



//#region Main Module Functions
app.post('/recordvisit', async (req, res) => {
      console.log('record visit started')
      console.log(req.hostname)

      try {
            db.open('visit')
            // console.log(req.body)
            let record = req.body;
            record.time = new Date(Date.now())
            let co = await db.collection();
            await co.insertOne(record)
            //console.log(JSON.stringify(req.body));
            db.close()
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
            db.open('visit')
            var co = await db.collection()
            var all = await co.find().toArray()
            db.close()

            res.status(200).json({ status: 'success', data: all })

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
            db.open('visit')
            let co = await db.collection()
            let result = await co.deleteOne(db.objectify(id))
            console.log(result)
            db.close()
            res.status(200).json({ status: 'success', id: id, result: result })

      } catch (error) {
            return res.status(501).json({
                  status: "error",
                  message: error.message
            });
      }
})
//#endregion
module.exports = app

