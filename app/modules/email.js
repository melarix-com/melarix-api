const express = require('express')
const app = express()
const db = require('./db')
const emailvalidator = require("email-validator");


//#region Main Module Functions
app.post('/emailForm', async (req, res) => {
      console.log('Post email form')
      let email = req.body.email
      if (!emailvalidator.validate(email)) {
            return res.status(501).json({
                  status: "error",
                  message: "Email is not valid."
            });
      }
      try {
            db.open('email')
            // console.log(req.body)
            let record = req.body;
            record.time = new Date(Date.now())
            let co = await db.collection();
            await co.insertOne(record)
            //console.log(JSON.stringify(req.body));
            db.close()
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

app.get('/newemail', async (req, res) => {
      console.log('record a single email')
      try {
            let email = req.query.email
            if (!emailvalidator.validate(email)) {
                  return res.status(501).json({
                        status: "error",
                        message: "Email is not valid."
                  });
            }

            db.open('email')
            let record = {
                  name: "single Email",
                  email: email,
                  from: req.headers.origin || "unknown",
                  time: new Date(Date.now())
            };
            let co = await db.collection();
            await co.insertOne(record)
            //console.log(JSON.stringify(req.body));
            db.close()
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

app.get('/getallemails', async (req, res) => {
      console.log('get all emails --')
      if (req.query.password != process.env.password) {
            console.log('Wrong password')
            return res.status(501).json({
                  status: "error",
                  message: 'Wrong password'
            });
      }
      try {
            db.open('email')
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

app.get('/deleteemail', async (req, res) => {

      console.log('delete a email --')
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
            db.open('emai;')
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

