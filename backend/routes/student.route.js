let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  var bcrypt = require('bcrypt');
  var session = require('express-session');
  var sql = require('../database/sqldb');
// Student Model
let studentSchema = require('../models/Student');
let companySchema = require('../models/Company');
let jobSchema = require('../models/Job');
var BCRYPT_SALT_ROUNDS = 12;
// CREATE Student
router.route('/create-student').post((req, res, next) => {
  bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
  .then((hashedPass) => {
    req.body.password = hashedPass;
    sql.query("INSERT INTO students SET ?", req.body, (error, data) => {
      if (error) {
       res.json(error);
      } else {
        console.log(data)
        res.json(data)
      }
    })
  })
  .catch((err) => {
      console.log("Error saving student: ");
      console.log(error);
      next();
  });
});

router.route('/user').get((req, res, next) => {
  var user = session.user;
  // console.log(session.user);
  var data = {
    user: user,
    isStudent: session.isStudent
  }
  res.json(data);
});

router.route('/logout').get((req,res) => {
  console.log("route hit")
  session.user = undefined;
  session.isStudent = false;
  res.json("done");
});


router.route('/login').post((req, res) => {
  sql.query("SELECT * FROM students WHERE email = ?", [req.body.email], (error, user) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else if (user[0] == null){
      res.json("No user with that email");
    } else {
      bcrypt.compare(req.body.password, user[0].password)
        .then(function(samePassword){
          if(!samePassword){
            res.json("Password invalid");
          } else {
            session.user = user[0];
            session.isStudent = true;
            var data = {
              user: user[0],
              isStudent: session.isStudent
            }
            res.send(data);
          }
        });
      // res.json(user);
    }
  })
});


router.route('/search').post((req,res) => {
  console.log(req.body);
studentSchema.find({
        // $match: {
          $or:[
            {name: {
              $regex: req.body.search,
              "$options": 'i'
            }},
            {collegeName: {
              $regex: req.body.search,
              $options: 'i'
            
            }}
            ]
            }
          //  }
           , function(err, students) 
  {
     if (err)
     {
         res.send(err);
     }
     console.log("Students : ",JSON.stringify(students));
     res.end(JSON.stringify(students));
 
  });
});

router.route('/searchJobs').post((req,res) => {
  console.log(req.body);
  var companyList;
  companySchema.find({name: {$regex: req.body.search, $options: 'i'}},
    function(err, companies){
      if(err){
        console.log(err);
      } else {
        // console.log(companies);
        companyList = companies;
        console.log("after company find");
        console.log(companyList);
        jobSchema.find({
          // $match: {
            $or:[
              {title: {
                $regex: req.body.search,
                "$options": 'i'
              }},
              {company: {$in: companyList}}
              ]
              }
            //  }
             , function(err, jobs) 
        {
        if (err)
        {
           res.send(err);
          }
        console.log("Jobs : ",JSON.stringify(jobs));
         res.end(JSON.stringify(jobs));
   
          });
      }
    }
  )


});

router.route('/jobCompany').post((req,res) => {
  console.log("inside company name get");
  console.log(req.body);
  var thisCompany;
  companySchema.findOne({_id: req.body.company},
    function(err, company){
      if(err){
        console.log(err);
      } else {
        console.log(company);
        res.json(company);
      }
    }
  )
});

// // READ Students
// router.route('/').get((req, res) => {
//   studentSchema.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })



// // Get Single Student
// router.route('/edit-student/:id').get((req, res) => {
//   studentSchema.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })


// // Update Student
// router.route('/update-student/:id').put((req, res, next) => {
//   studentSchema.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('Student updated successfully !')
//     }
//   })
// })

// // Delete Student
// router.route('/delete-student/:id').delete((req, res, next) => {
//   studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       })
//     }
//   })
// })

module.exports = router;