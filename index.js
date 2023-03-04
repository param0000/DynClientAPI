var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var route = require('./src/routes')
var cors = require('cors')
var app = express();
app.use(cors({origin:'*',methods:'*',allowedHeaders:'*',exposedHeaders:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api',route)
app.listen(
    8500, () => {
    console.log('App runs Successfully')}
)