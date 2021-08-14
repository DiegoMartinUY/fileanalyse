const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const cors = require('cors');
require('dotenv').config()

const app = express();


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('uploadedImage'), (req, res)=>{
  const file = req.file;
  const body = req.body;
  console.log(file, body);
  res.json({name:file.name, type:file.content-Type,size:file.size});
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
