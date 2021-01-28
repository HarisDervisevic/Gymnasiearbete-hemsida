const express = require('express')
const dbmodule = require('./dbmodule')
const personModel = require('./PersonModel')
const app = express()
const port = 3000

const clientDir = __dirname + "\\client\\"

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(clientDir))

app.set('view engine', 'ejs')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

app.get('/', (req, res) => res.sendFile(__dirname + "\\client\\index.html"))

app.get('/blogg',function(req,res){
  res.render('blogg.ejs', { });
 });


app.post('/', (req, res) => {
  let person = personModel.createPerson({ name: req.body.name, email: req.body.email});
  
  dBModule.store(person)
  person.save();
  res.redirect();
})

const logger = function (req, res, next) {
  console.log('')
  next()
}

app.use(logger)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
}) 