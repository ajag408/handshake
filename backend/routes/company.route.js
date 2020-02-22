let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();
var bcrypt = require('bcrypt');
var session = require('express-session');
// company Model
let companySchema = require('../models/Company');
let jobSchema = require('../models/Job');
let eventSchema = require('../models/Event');
var BCRYPT_SALT_ROUNDS = 12;
var multer = require('multer');
const path = require('path')
const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { files: 5}
});
var fs = require('fs');
// CREATE company
router.route('/create-company').post((req, res, next) => {
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then((hashedPass) => {
            req.body.password = hashedPass;
            companySchema.create(req.body, (error, data) => {
                if (error) {
                  res.json(error)
                } else {
                  console.log(data)
                  res.json(data)
                }
              })
        })
        .catch((err) => {
            console.log("Error saving company: ");
            console.log(error);
            next();
        });
});

router.route('/user').get((req, res, next) => {
  // var logged = session.isCompany;
  var user = session.user;
  console.log(session.user);
  var data = {
    user: user,
    isCompany: session.isCompany
  }
  res.json(data);
});

router.route('/logout').get((req,res) => {
  console.log("route hit")
  session.user = undefined;
  session.isCompany = false;
  res.json("done");
});

router.route('/login').post((req, res) => {
  companySchema.findOne({email: req.body.email}, (error, user) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else if (user == null){
      res.json("No user with that email");
    } else {
      bcrypt.compare(req.body.password, user.password)
        .then(function(samePassword){
          if(!samePassword){
            res.json("Password invalid");
          } else {
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            session.user = user;
            session.isCompany = true;
            var data = {
              user: user,
              isCompany: session.isCompany
            }
            res.send(data);
          }
        });
      // res.json(user);
    }
  })
});

router.route('/create-job').post((req, res) => {
  req.body.company = session.user;
  console.log();
  console.log(req.body);
  jobSchema.create(req.body, (error, data) => {
    if (error) {
      res.json(error)
    } else {
      console.log("created");
      console.log(data)
      res.json("Added job");
    }
  })
});

router.route('/get-jobs').get((req,res) =>{
  jobSchema.find({company: session.user}, (error,jobs) => {
    if(error){
      console.log(error);
      res.json(error);
    } else {
      console.log("Jobs : ",JSON.stringify(jobs));
      res.end(JSON.stringify(jobs));
    }
  })
});

// Update company
router.route('/update-company').put((req, res, next) => {
  companySchema.findOneAndUpdate({email: session.user.email}, {
    // overwrite: true
    $set: req.body, 
  }, {new:true}, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)

      console.log(data);
      session.user = data;
      console.log('Company updated successfully !')
    }
  })
})

router.route('/profPic').post(upload.array('image', 5), (req, res, next) => {
 

  const images = req.files.map((file) => {
    return {
      filename: file.filename,
      originalname: file.originalname
    }
  })
  console.log(images);
  if (!images[0].originalname.match(/\.(gif|jpg|jpeg|tiff|png)$/i)){
    res.json("Not an image");
  } else {

 
  companySchema.findOneAndUpdate({email: session.user.email}, {
    $set: {profPicFile: images[0].filename, profPicOG: images[0].originalname}
  }, {new:true}, (error, data) => {
    if (error) {
      console.log(error)
      console.log('hello2');
      return next(error);

    } else {

        // res.json(data);
        session.user = data;
        res.json('Picture uploaded successfully !')
      }
      })
    }
    })


    router.route('/profPic/').get((req, res, next) => {
      console.log(UPLOAD_PATH);
      console.log(session.user)
        fs.createReadStream(path.resolve(UPLOAD_PATH, session.user.profPicFile)).pipe(res)

      })


router.route('/create-event').post((req, res) => {
  req.body.company = session.user;

  console.log(req.body);
  eventSchema.create(req.body, (error, data) => {
    console.log("hello");
    if (error) {
      res.json(error)
    } else {
      console.log("created");
      console.log(data)
      res.json("Added event");
    }
  })
});


router.route('/get-events').get((req,res) =>{
  eventSchema.find({company: session.user}, (error,events) => {
    if(error){
      console.log(error);
      res.json(error);
    } else {
      console.log("Events : ",JSON.stringify(events));
      res.end(JSON.stringify(events));
    }
  })
});


module.exports = router;