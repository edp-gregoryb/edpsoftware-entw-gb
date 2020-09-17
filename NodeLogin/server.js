var express = require('express');
var  cors = require('cors');
var bodyParser = require('body-parser');
var rp = require('request-promise');


const app = express();
const router = express.Router();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

global.__basedir = __dirname;




// router.route('/login').post((req, res) => {
//
//     var  body =  '{"request":{"filter":"fisExtAnmeld%04Userid%05' + req.body.username + '%06Passwort%05' + req.body.password +
//         '%06bhash%05' + req.body.fingerprint + '%06user-sprache%05d%06json%05yes%06firma%05' + req.body.mandant + '"}}';
//
//     var options = {
//         url: "https://edp-api.faros.ch/entw.aspx",
//         body: body,
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };
//
//     rp(options)
//         .then(function (test){
//             var json = JSON.parse(test);
//             // var result = json.REST[0].messageResponse;
//             res.send(json);
//         })
//         .catch(function (err){
//             console.log("fisitaufartAend error "+err);
//         });
// });

app.use(express.static('public'));
app.use('/', router);
app.use(cors({ origin: true }))

let ngPath = path.join(__dirname, 'dist/');
app.use(express.static(ngPath));

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.route('/login')
    .get((req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    });
// app.get('/*', (req, res) => {
//     res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
//     res.sendFile(path.join(ngPath, 'index.html'));
// });


app.listen(4000, () => console.log(`Express server running on port 4000`));
