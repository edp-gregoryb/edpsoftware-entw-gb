const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    sqlite3 = require('sqlite3').verbose(),
    rp = require('request-promise');

var cb2;
var instanz;
var mandant;
var sprache;
var username;
var password;
var termid;

const app = express();
app.use(cors());
app.options('*', cors());
let db = require("./database");
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/login', function (req, res) {
    // console.log('login', req.query);
    // res.sendStatus(200);
    res.sendFile(path.join(__dirname + '/loginform.html'));
});
app.get("/logout", function (req, res) {

    instanz = "";
    mandant = "";
    sprache = "";
    username = "";
    password = "";
    termid = "";

    res.sendFile(path.join(__dirname + '/loginform.html'));

})

app.post('/auth', function (req, res) {
    instanz = req.body.instanz;
    mandant = req.body.mandant;
    sprache = req.body.sprache;
    username = req.body.username;
    password = req.body.password;

    // console.log('instanz', instanz);
    // console.log('mandant', mandant);
    // console.log('sprache', sprache);
    // console.log('username', username);
    // console.log('password', password);

    if (username && password && instanz && mandant && sprache) {
        let body = '{"request":{"filter":"fisExtAnmeld%04Userid%05' + username + '%06Passwort%05' + password + '%06bhash%05%06user-sprache%05' + sprache + '%06json%05yes%06firma%05' + mandant + '"}}';

        var options = {
            url: instanz,
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        rp(options)
            .then(function (test) {
                var json = JSON.parse(test);
                var resultObject = json.REST[0].messageResponse;
                var jsonrest = JSON.parse(resultObject);
                console.log('login', jsonrest);
                if (jsonrest) {
                    termid = jsonrest.tt_login[0].termid
                    postObj();
                }

            })
    } else {
        res.send('Incorrect Username and/or Password!');
    }
    res.end();

})


function postObj() {
    return new Promise(function (resolve, reject) {
        let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + termid + '%06sprache%05' + sprache + '%06objekt%05%06suche%05%06firma%05' + mandant + '%06"}}';

        var options = {
            url: instanz,
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        rp(options)
            .then(function (test) {
                var json = JSON.parse(test);
                var resultObject = json.REST[0].messageResponse;
                var jsonrest = JSON.parse(resultObject);
                // console.log(jsonrest)
                for (let ro of jsonrest.tt_vlobjabfrage) {
                    // console.log("resultObject", ro)
                    //getProd(ro.objekt, ro.obj_bezeichnung, ro.untertitel)
                    getProdukt(ro.objekt, ro.obj_bezeichnung, ro.untertitel)
                    readTable().then(function success(data) {
                        resolve(data);
                        //res.send(data);
                    })
                }


                })

    .catch(function (err) {
        console.log("restvlobjabfrage error " + err);
    });
})
}




function getProdukt(obj, objbez, untertitel) {
    return new Promise(function (resolve, reject) {
        let body = '{"request":{"filter":"restvlgetprodukt%04Termid%05' + termid + '%06sprache%05' + sprache + '%06objekt%05' + obj+ '%06aschlussel%05%06firma%05' + mandant + '%06"}}}';

        var options = {
            url: instanz,
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        rp(options)
            .then(function (test){
                var json = JSON.parse(test);
                var result = json.REST[0].messageResponse;
                var jsonrest = JSON.parse(result);
                if (jsonrest.tt_vlprodukt.length >= 1) {
                    // console.log("result", jsonrest);
                    if (jsonrest) {
                        saveObjektAschlussel(jsonrest.tt_vlprodukt[0].objekt, objbez, untertitel, jsonrest.tt_vlprodukt[0].aschlussel);
                        getProdArtikel(jsonrest.tt_vlprodukt[0].objekt, jsonrest.tt_vlprodukt[0].aschlussel);
                        getvlAschlussel(jsonrest.tt_vlprodukt[0].objekt, jsonrest.tt_vlprodukt[0].aschlussel);

                        //resolve(jsonrest);
                    }
                }
            })
            .catch(function (err){
                console.log("restvlobjabfrage error "+err);
            });

    })

}

function postObjUpdate() {
    return new Promise(function (resolve, reject) {
        let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + termid + '%06sprache%05' + sprache + '%06objekt%05%06suche%05%06firma%05' + mandant + '%06"}}';

        var options = {
            url: instanz,
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        rp(options)
            .then(function (test) {
                var json = JSON.parse(test);
                var resultObject = json.REST[0].messageResponse;
                var jsonrest = JSON.parse(resultObject);
                // console.log(jsonrest)
                for (let ro of jsonrest.tt_vlobjabfrage) {
                    // console.log("resultObject", ro)
                    //getProd(ro.objekt, ro.obj_bezeichnung, ro.untertitel)
                    getProduktOhneSave(ro.objekt, ro.obj_bezeichnung, ro.untertitel)
                    readTable().then(function success(data) {
                        resolve(data);
                        //res.send(data);
                    })
                }


            })

            .catch(function (err) {
                console.log("restvlobjabfrage error " + err);
            });
    })
}



function getProduktOhneSave(obj, objbez, untertitel) {
    return new Promise(function (resolve, reject) {
        let body = '{"request":{"filter":"restvlgetprodukt%04Termid%05' + termid + '%06sprache%05' + sprache + '%06objekt%05' + obj+ '%06aschlussel%05%06firma%05' + mandant + '%06"}}}';

        var options = {
            url: instanz,
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        rp(options)
            .then(function (test){
                var json = JSON.parse(test);
                var result = json.REST[0].messageResponse;
                var jsonrest = JSON.parse(result);
                if (jsonrest.tt_vlprodukt.length >= 1) {
                    // console.log("result", jsonrest);
                    if (jsonrest) {
                        getProdArtikel(jsonrest.tt_vlprodukt[0].objekt, jsonrest.tt_vlprodukt[0].aschlussel);
                        getvlAschlussel(jsonrest.tt_vlprodukt[0].objekt, jsonrest.tt_vlprodukt[0].aschlussel);

                        //resolve(jsonrest);
                    }
                }
            })
            .catch(function (err){
                console.log("restvlobjabfrage error "+err);
            });

    })

}

async function saveObjektAschlussel(objekt, objektbez, untertitel, aschlussel) {
    // Save in the database.
    const item = {
        objekt: objekt,
        obj_bezeichnung: objektbez,
        untertitel: untertitel,
        aschlussel: aschlussel
    }

    try {
        await db.models.renderTable.create(item);
    } catch (error) {
        console.log("There was an error saving the person.\n" + error);
    }
}

app.get('/refreshProgress', function (req, res) {
    return new Promise(function (resolve, reject) {
        console.log('refreshProgress', req.query);
        getProdArtikel(req.query.objekt, req.query.aschlussel);
        readTable().then(function success(data) {
            resolve(data);
            res.send(data);
        })
    })
})

app.get('/refreshPage', function (req, res) {
    return new Promise(function (resolve, reject) {
        console.log('refreshPage', req.query);
        postObjUpdate();
    })
   res.sendStatus(200);
})

app.get('/addObjekt', function (req, res) {
    return new Promise(function (resolve, reject) {
        console.log('addObjekt', req.query);
        const item = {
            objekt: req.query.objekt,
            obj_bezeichnung: req.query.objektbez,
            untertitel: req.query.untertitel,
            aschlussel: req.query.aschlussel
        }

        try {
             db.models.renderTable.create(item);
             resolve(item);
             res.sendStatus(200);
        } catch (error) {
            console.log("There was an error saving the person.\n" + error);
        }
    })
})



function getProdArtikel(obj, aschlussel) {
    return new Promise(function (resolve, reject) {
        let body = '{"request":{"filter":"restvlgetprodartikel%04Termid%05' + termid + '%06sprache%05' + sprache + '%06objekt%05' + obj + '%06aschlussel%05' + aschlussel + '%06objektartikel%05%06firma%05' + mandant + '%06"}}';

        var options = {
            url: instanz,
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        rp(options)
            .then(function (test) {
                var json = JSON.parse(test);
                var resultObject = json.REST[0].messageResponse;
                var jsonrest = JSON.parse(resultObject);
                // console.log('getArtikel', jsonrest)
                getvlProdArtAufgabe(jsonrest.tt_vlprodartikel[0].objekt, jsonrest.tt_vlprodartikel[0].aschlussel, jsonrest.tt_vlprodartikel[0].objektartikel);
                getFortschritt(jsonrest.tt_vlprodartikel);
                //resolve(jsonrest);

            })

            .catch(function (err) {
                console.log("restvlobjabfrage error " + err);
            });
    })
}

function getvlAschlussel(obj, aschlussel) {
    return new Promise(function (resolve, reject) {
        let body = '{"request":{"filter":"restvlgetaschlussel%04Termid%05' + termid + '%06sprache%05' + sprache + '%06objekt%05' + obj + '%06aschlussel%05' + aschlussel + '%06firma%05' + mandant + '%06"}}';

        var options = {
            url: instanz,
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        rp(options)
            .then(function (test) {
                var json = JSON.parse(test);
                var resultObject = json.REST[0].messageResponse;
                var jsonrest = JSON.parse(resultObject);
                // console.log('Aschlussel', jsonrest)
                // resolve(jsonrest);
                return updateRenderTable(jsonrest.tt_vlgetaschlussel[0].aschlussel, jsonrest.tt_vlgetaschlussel[0].ausgbez);

            })

            .catch(function (err) {
                console.log("restvlobjabfrage error " + err);
            });
    })
}

function readTable(){
    return new Promise(function (resolve, reject) {
        let objects =  db.models.renderTable.findAll();

        if (objects.length == 0) {
            res.send("No record exists in the database right now for Person table.");

        } else {
            console.log('objects', objects)
            resolve(objects);

        }
    })
}

//aufgabenid = 0
function getFortschritt( artikel){
   getProgress(0, artikel, 0, 0, 0);

}

function getProgress(j, allArtikel, p, counter, done) {

    let body = '{"request":{"filter":"restvlgetprodartikelaufgabe%04Termid%05' + termid + '%06sprache%05' + sprache + '' +
        '%06objekt%05' + allArtikel[p].objekt + '%06aschlussel%05' + allArtikel[p].aschlussel + '%06objektartikel%05' + allArtikel[p].objektartikel + '%06aufgabeid%050' +
        '%06firma%05' + mandant + '%06"}}';

    var options = {
        url: instanz,
        body: body,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };

    rp(options)
        .then(function (test) {
            var json = JSON.parse(test);
            var resultObject = json.REST[0].messageResponse;
            var jsonrest = JSON.parse(resultObject);
            var allAufgaben = jsonrest.tt_vlprodartikelaufgabe;

            for(let i = 0; i < allAufgaben.length; i++){
                counter++;
                if(allAufgaben[i].erledigt === true){
                    done++;
                }
            }

            if(counter !== 0){
                console.log('done/counter', done + ',' + counter);
                updateRenderTableFortschritt(allArtikel[p].aschlussel,(done/counter) * 100);
            } else {
                console.log('done/counter', '0');
                 updateRenderTableFortschritt(allArtikel[p].aschlussel,'0');
            }

            if(p < allArtikel.length - 1) {
                getProgress(j, allArtikel, p + 1, counter, done);
            }



        })

        .catch(function (err) {
            console.log("getProgress error " + err);
        });


}

cb2 = async function gettable(req, res) {
    let objects = await db.models.renderTable.findAll();

    if (objects.length == 0) {
        res.send("No record exists in the database right now for Person table.");

    } else {
        // console.log('objects', objects)
        res.send(objects);

    }
}

app.get("/getRenderTable",[cb2]);


function updateRenderTable(aschlusselIn, ausgbez) {
    return new Promise(function (resolve, reject) {
        let aschlussel = db.models.renderTable.update(
            {ausgbez: ausgbez},
            {
                where: {
                    aschlussel: aschlusselIn
                }
            }).then(readTable().then(function success(data) {
                resolve(data);
            })
        );
    })
}

function updateRenderTableFortschritt(aschlusselIn, fortschritt) {
    return new Promise(function (resolve, reject) {
        let aschlussel = db.models.renderTable.update(
            {fortschritt: fortschritt},
            {
                where: {
                    aschlussel: aschlusselIn
                }
            }).then(readTable().then(function success(data) {
                resolve(data);
            })
        );
    })
}





function getvlProdArtAufgabe(obj, aschlussel, objartikel) {
    return new Promise(function (resolve, reject) {
        let body = '{"request":{"filter":"restvlgetprodartikelaufgabe%04Termid%05' + termid + '%06sprache%05' + sprache + '%06objekt%05' + obj + '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objartikel + '%06aufgabeid%050%06firma%05' + mandant + '%06"}}';

        var options = {
            url: instanz,
            body: body,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        rp(options)
            .then(function (test) {
                var json = JSON.parse(test);
                var resultObject = json.REST[0].messageResponse;
                var jsonrest = JSON.parse(resultObject);
                //console.log('restvlgetprodartikelaufgabe', jsonrest)
                resolve(jsonrest);
            })

            .catch(function (err) {
                console.log("restvlgetprodartikelaufgabe error " + err);
            });
    })
}




let port = process.env.PORT || 4000;

const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});



