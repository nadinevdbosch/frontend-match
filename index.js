const express = require("express");
const ejs = require("ejs");
const find = require("array-find");
const slug = require("slug");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const mongo = require("mongodb");
var db = null;
const url = process.env.mongodbURL;


mongo.MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    db = client.db(process.env.DB_NAME);
});

// MULTER SETUP

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "static/uploads/"); // locatie waar de files moeten worden opgeslagen
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const uploadFile = multer({ storage: storage });
const port = process.env.PORT;

express()
    .set("view engine", "ejs")
    .set("views", "views")
    .use(express.static("static"))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    }))
    .get("/profiles", profiles )
    .get("/my-profile", myProfile)
    .get("/", startscreen)
    .post("/my-profile", uploadFile.single("profielfoto"), add)
    .post("/profiles", answer)
    .post("/log-out", logOut)
    .post("/delete-profile", deleteProfile)
    .post("/update-profile", uploadFile.single("profielfoto"), update)
    .get("/my-profile/update", updateProfile)
    .get("/profiles/:naam", profile)
    .get("/quiz-intro", quizIntro)
    .get("/questions", questions)
    .listen(port || 3000, () => console.log("listening at " + port));

function startscreen(req, res) {
    if(req.session.user){
        console.log()
        res.redirect("/profiles");}
    else{
        res.render("index");
    }
}

var dataMyProfile;

function add(req, res) {
    dataMyProfile = {
        naam: req.body.naam,
        geslacht: req.body.geslacht,
        voorkeur: req.body.voorkeur,
        leeftijd: req.body.leeftijd,
        bio: req.body.bio,
        profielfoto: req.file.filename
    };

    res.redirect("/quiz-intro");

}

function questions(req, res) {

    res.render("quiz-question");

}

function myProfile(req, res) {
    db.collection("users").findOne(
        {_id: mongo.ObjectID(req.session.user._id)}, done);

    function done(err, profile) {
        if (err) {
            next(err);
        } else {
            dataMyProfile = profile
            res.render("my-profile", {
                data: profile,
                profile : dataMyProfile
            });
        }
    }
}


function quizIntro(req, res) {
    res.render("quiz-intro");
}

function quizQuestion(req, res) {
    res.render("quiz-question");
}

var dataProfiles = [];

function profiles(req, res, next) {

    db.collection("users").find({"geslacht": req.session.user.voorkeur }).toArray(userData)

        function userData(err, userData){
            console.log(userData)
            dataProfiles = userData;
            for (user = 0; user < userData.length; user++) {
                var matchPercentage = 0
                for (i = 0; i < dataMyProfile.antwoorden.length; i++) {
                    if(dataMyProfile.antwoorden[i] === userData[user].antwoorden[i]){
                        matchPercentage += 10
                    }
                }
                console.log('het matchpercentage met ' + userData[user].naam + ' = ' + matchPercentage)
                dataProfiles[user].matchpercentage= matchPercentage
                //Sorteren zodat de hoogste match bovenaan komt te staan
                dataProfiles.sort(function(a,b) {
                    return b.matchpercentage - a.matchpercentage;
                });

                }
            res.render("list", {
                data : dataProfiles,
                profile : dataMyProfile });
        }

}

function profile(req, res, next) {
    console.log(dataProfiles)
    var naam = req.params.naam;
    var profile = find(dataProfiles, function (value) {
        return value.naam === naam;
    });

    if (!profile) {
        next();
        return;
    }

    res.render("detail", {
        data: profile,
        profile : dataMyProfile
     });
}

var quizAnswers = [];

function answer(req, res) {

        quizAnswers.push(req.body.answer1)
        quizAnswers.push(req.body.answer2)
        quizAnswers.push(req.body.answer3)
        quizAnswers.push(req.body.answer4)
        quizAnswers.push(req.body.answer5)
        quizAnswers.push(req.body.answer6)
        quizAnswers.push(req.body.answer7)
        quizAnswers.push(req.body.answer8)
        quizAnswers.push(req.body.answer9)
        quizAnswers.push(req.body.answer10)


        dataMyProfile.antwoorden = quizAnswers
        req.session.user = dataMyProfile
        db.collection('users').insertOne(req.session.user, addUser);

        function addUser(err, data) {
            if (err) {
            console.log(err);
            } else {
            req.session.user._id = data.insertedId;
            console.log(req.session.user)
            }


        quizAnswers = [];
        console.log(dataMyProfile);
        res.redirect("/profiles");


    console.log(quizAnswers);

}
}

function deleteProfile(req, res) {
    db.collection("users").deleteOne({
    _id : mongo.ObjectId(req.session.user._id) }, deleteUser);

    function deleteUser(err) {
      if (err) {
        next(err);
      } else {
        quizAnswers= [];
        req.session.destroy();
        res.redirect('/');
      }
    }
  }

  function updateProfile(req, res) {
    res.render("update", {
        profile : dataMyProfile
    });
}

function update(req, res) {
    db.collection('users').updateOne({
      _id: mongo.ObjectID(req.session.user._id) },
      {
        $set: {
            naam: req.body.naam,
            geslacht: req.body.geslacht,
            voorkeur: req.body.voorkeur,
            leeftijd: req.body.leeftijd,
            bio: req.body.bio,
            profielfoto: req.file.filename,
            }

        }, done);

    function done(err) {
      if (err) {
        next(err);
      } else {
        res.redirect('/my-profile');
      }
    }
  }

function logOut(req, res) {
    req.session.destroy();
    res.redirect('/');
}

console.log(db);




