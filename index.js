const express = require('express');
const MongoClient = require('mongodb').MongoClient
const app = express();


app.set('view engine', 'ejs');

// app.use(express.static(__dirname + '/public'));

var db

var connectionString = 'mongodb://george-coords-user:qwerty123@ds249839.mlab.com:49839/lat_long_vals'
MongoClient.connect(connectionString, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(4000, () => {
    console.log('listening on 4000')
  })
})

app.get('/', (req, res) => {
  db.collection('coords').find().toArray((err, result) => {
    if (err) return console.log(err)
	res.render('index.ejs', {coords: result})
  })
})

app.post('/coords', (req, res) => {
  db.collection('coords').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
