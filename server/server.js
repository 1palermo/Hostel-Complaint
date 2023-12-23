const express= require("express");
const cors= require("cors");
const bodyParser= require("body-parser");
const newUser= require("./routes/newUser");
const report= require("./routes/report");
const mongoose = require("./config/connect");
const sendOtp = require("./routes/sendOtp");
const fileupload = require("express-fileupload")
//const session = require("express-session");
//var MongoDBStore = require('connect-mongodb-session')(session);

const app= express();


/*
const io= new Server(server,{
   maxHttpBufferSize: 1e7,
   cors:{
     origin: "*",
     methods: ["GET","POST"]
   },
});
*/

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(fileupload({
  useTempFiles: true,
}))

app.use(cors({
  origin: ["http://localhost:3000","https://490bj8xz-3000.inc1.devtunnels.ms"],
  credentials: true
}));

/*
var store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/hostelDatabase",
  collection: 'Sessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(
  session({
    secret: "This is my secret",
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7 ,
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

*/
//app.use(isAuth);

app.use("/",newUser);
app.use("/report",report);
app.use("/otpVerification",sendOtp);

app.listen(8080, () => {
    console.log("server listening on port: 8080");
})