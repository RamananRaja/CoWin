const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const multer = require('multer');
const xlsxj = require("xlsx-to-json");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, x-access-token, x-refresh-token, content-type, Accept, _id");
    res.header("Access-Control-Expose-Headers", "x-refresh-token, x-access-token");
    res.header("Access-Control-Allow-Credentials", true);

    next();
});
app.use(bodyParser.json());

//LOAD IN MONGOOSE MODELS
const { Vaccine } = require('./db/models/empVaccineDetails.model') 


/*USER ROUTES*/

/**
 * POST /test
 * Purpose: test
 */
app.get('/test', (req,res) => {
    console.log('works');
    res.send("works")
})

/**
 * POST /saveData
 * Purpose save employee data to database
 */
app.post('/saveData', (req,res) => {
    data=req.body.data;
    console.log(data);
    res.send("save data called");

    for(let user of data) {
        console.log(user);
        let userData = new Vaccine(user);
        userData.save().then(() => {
            console.log("DATA SAVED :)")
            //res.send("saved")
        }).catch((e) => {
            console.log("no saved err:(")
            console.log(e);
        })
    }

    
})

/**
 * POST /submitUserData
 * Purpose: save user data to database
 */
/*
app.post('/submitUserData', (req,res) => {
    console.log("submit user data");
    
    let body = req.body;
    let newData = new Vaccine(req.body);

    console.log(body);

    newData.save().then(() => {
        console.log(newData);
        res.send(newData);
    }).catch((e) => {
        console.log(e);
        res.send(400).send(e);
    })
})*/ 
/**
 * POST /xlsxToJSON
 * Purpose: xlsxToJSON
 */
/*
    app.post('/xlsxToJSON', async(req, res) => {
        
        let tempStorage = multer.diskStorage({
            destination: (req, file, cb) => {
            
                cb(null, "./public/temp");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '_' + file.originalname);
            }
        });
        
        let tempUpload = multer({ storage: tempStorage }).single('file');
        
        tempUpload(req, res, async(err) => {
            if (err) {
                
                return res.status(501).send({ success: false, message: err });
            } else {
                xlsxj({
                    input: file, 
                    output: "output.json"
                  }, function(err, result) {
                    if(err) {
                      console.error(err);
                    }else {
                      console.log(result);
                    }
                  });
            }
        });
    });
*/



app.listen(3000, () => {
    console.log("SERVER LISTENING IN PORT 3000 :)");
})