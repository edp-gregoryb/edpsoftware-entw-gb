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
var FarosdateienService = /** @class */ (function () {
    function FarosdateienService(http, loginparameterService) {
        this.http = http;
        this.loginparameterService = loginparameterService;
        this.loginparameter = this.loginparameterService.getparameter();
    }
    FarosdateienService.prototype.showfarosdateien = function (aufnr, objekt, erscheinung, typ) {
        var body = '{"request":{"filter":"farosGetDateien%04Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06objekt%05' +
            objekt + '%06typ%05' + typ + '%06erschdat%05' + erscheinung + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
        var jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06objekt%05' +
            objekt + '%06typ%05' + typ + '%06erschdat%05' + erscheinung + '%06firma%05' + this.loginparameter.loginfirma + '%06';
        var jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
        //let body = '{"request":{"filter":"farosGetDateien%04'+jsonbase64+'"}}';
        var headers = new http_1.Headers({ 'content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: 'POST' });
        return this.http.post(this.loginparameter.loginurl, body, options)
            .map(this.extractData);
        //   .map(resp => resp.json());
    };
    FarosdateienService.prototype.extractData = function (res) {
        var resultJson = res.json();
        console.log("resultJson", resultJson);
        if (resultJson.REST.length === 0) {
            console.log("farosdateien leer");
        }
        else {
            if (resultJson.REST[0].messageResponse === "{}" || resultJson.REST[0].messageResponse.indexOf('F', 0) === 0) {
                console.log("resultJson ist leer");
                var emptyvalue = [{}];
                return emptyvalue;
            }
            else {
                var result = resultJson.REST[0].messageResponse;
                var message_expression = /\\u000a/g;
                result = result.replace(message_expression, '');
                var tempres = JSON.parse(result);
                console.log("tempres farosdateien", tempres);
                if (!tempres) {
                    console.log("tempres leer " + JSON.stringify(tempres));
                }
                else {
                    //console.log("tempres " + JSON.stringify(tempres));
                    var collection = tempres.dateien.slice();
                    var colkey = [["dataname", "dataurl"]];
                    var keys = colkey.shift();
                    collection = collection.map(function (e) {
                        var obj = {};
                        keys.forEach(function (key, i) {
                            obj[key] = e[i];
                        });
                        return obj;
                    });
                }
                return collection;
            } /**/
        }
    };
    FarosdateienService = __decorate([
        core_1.Injectable()
    ], FarosdateienService);
    return FarosdateienService;
}());
exports.FarosdateienService = FarosdateienService;
