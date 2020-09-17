"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var FisFileDownloadService = /** @class */ (function () {
    function FisFileDownloadService(http, loginparameterService) {
        this.http = http;
        this.loginparameterService = loginparameterService;
        this.loginparameter = this.loginparameterService.getparameter();
    }
    FisFileDownloadService.prototype.getfisdateien = function (aufnr, objekt, erscheinung, typ, dateiname) {
        var body = '{"request":{"filter":"fisFileDownload%04Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06objekt%05' +
            objekt + '%06typ%05' + typ + '%06erschdat%05' + erscheinung + '%06dateiname%05' + dateiname + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
        var jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06objekt%05' +
            objekt + '%06typ%05' + typ + '%06erschdat%05' + erscheinung + '%06dateiname%05' + dateiname + '%06firma%05' + this.loginparameter.loginfirma + '%06';
        var jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
        //let body = '{"request":{"filter":"fisFileDownload%04'+jsonbase64+'"}}';
        var headers = new http_1.Headers({ 'content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: 'POST' });
        return this.http.post(this.loginparameter.loginurl, body, options)
            .map(this.extractData);
        //   .map(resp => resp.json());
    };
    FisFileDownloadService.prototype.extractData = function (res) {
        var resultJson = res.json();
        if (resultJson.REST[0].messageResponse === "{}" || resultJson.REST[0].messageResponse.indexOf('F', 0) === 0) {
            console.log("resultJson ist leer");
            var emptyvalue = [{}];
            return emptyvalue;
        }
        else {
            var result = resultJson.REST[0].messageResponse;
            var message_expression = /\\u000a/g;
            var result1 = result.replace(message_expression, '');
            var resultJson2 = JSON.parse(result1);
            //  let result2 = resultJson2;
            //  var collection = result2.dateien.slice();
            //  var colkey = [["dataname", "dataurl"]];
            //  var keys = colkey.shift();
            //  collection = collection.map((e)=> {
            //   var obj = {};
            //             keys.forEach(function (key, i) {
            //                 obj[key] = e[i];
            //             });
            //              return obj;
            //  })
            // //let datajson = (result2);
            //  console.log("service",collection);
            return resultJson2;
        }
    };
    FisFileDownloadService = __decorate([
        core_1.Injectable()
    ], FisFileDownloadService);
    return FisFileDownloadService;
}());
exports.FisFileDownloadService = FisFileDownloadService;
