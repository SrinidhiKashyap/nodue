require('dotenv').config()


const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var nodemailer = require('nodemailer');

// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//   mail: { type: String, required: true },
//   pass: { type: String, required: true }
// });
// mongoose.set('strictQuery', true);
// var User = mongoose.model('User', userSchema);
// mongoose.connect('mongodb+srv://kashy:kashy@cluster0.g03nczj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});




router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/home.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+'/views/reg.html'));
});

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/views/login.html'));
});

router.get('/forgotpass',function(req,res){
  res.sendFile(path.join(__dirname+'/views/forgotpass.html'));
});
router.get('/aboutus',function(req,res){
  res.sendFile(path.join(__dirname+'/views/aboutus.html'));
});
router.get('/contactus',function(req,res){
  res.sendFile(path.join(__dirname+'/views/contactus.html'));
});

router.get('/dept',function(req,res){
  res.sendFile(path.join(__dirname+'/views/dept-home-page.html'));
});

router.get('/newreq',function(req,res){
  res.sendFile(path.join(__dirname+'/views/newreq.html'));
});

router.get('/student',function(req,res){
  res.sendFile(path.join(__dirname+'/views/studtable.html'));
});

router.get('/oldreq',function(req,res){
  res.sendFile(path.join(__dirname+'/views/oldreq.html'));
});

//add the router
app.use(express.static(path.join(__dirname,'public')));
app.use('/', router);
app.listen(process.env.PORT || 3000);

console.log('Running at Port 3000');




// JavaScript function to generate a random password
function generatePassword() {
  var password = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789)(*&^%$#@!{}[];";

  for (var i = 0; i < 8; i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return password;
}

// Node.js code to handle the form submission and send the email
app.post("/register", (req, res) => {
  // Get the user's email and name from the form
  var email = req.body.email;
  var name = req.body.userid;

  // Generate a random password
  var password = generatePassword();

  // Use Nodemailer to send an email to the user with their new password
  var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });

  var mailOptions = {
      from: "nodueportal@gmail.com",
      to: email,
      subject: "Welcome to No due Portal",
      text: `Dear ${name},\n\nWelcome to No due portal. Your generated password is ${password}.\n\nBest regards,\nJSSSTU`
  };

  
  // const newUser = new User({
  //   mail: email,
  //   pass: password
  // });
  
  // // Save the user to the database
  // newUser.save((error) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Sucessfull")
  //   }
  // });
  

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log("Email sent: " + info.response);
      }
  });

  // Save the user's email and password to the database
  // ...

  connection.query(
    `INSERT INTO users (userid,email, pass) VALUES (?, ?, ?)`,
    [name, email, password],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        console.log("User registered successfully");
      }
    }
  );

  // Redirect the user to the login page
  res.redirect("/");
});










