const fs = require('fs')
const express = require('express')

let app = express()

app.set('views', './views')

app.engine('art', require('express-art-template'));

app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
});

app.use(express.static('public'));

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.listen(3000);
console.log('web in ', 3000);

app.get('/', (req, res) => {
  res.render('index.art');
})

app.post('/test', multipartMiddleware, function (req, res) {
  console.log('files: ', req.files);

  res.send({
    msg: '上传成功'
  })
})

app.post('/blob', multipartMiddleware, function (req, res) {
  console.log('files: ', req.files);
  res.send({
    msg: '上传成功'
  })
})
