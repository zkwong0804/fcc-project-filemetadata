var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const upload = multer({dest: 'zhenkaiupload'});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// file upload API
function handleFileUpload(req, res) {
  const upfile = req.file;
  const info = {
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size,
  };
  res.json(info);
}

app.post('/api/fileanalyse', upload.single('upfile'), handleFileUpload);




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
