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
var FarosgetinseratejpgService = /** @class */ (function () {
    function FarosgetinseratejpgService(http, loginparameterService) {
        this.http = http;
        this.loginparameterService = loginparameterService;
        this.loginparameter = this.loginparameterService.getparameter();
    }
    FarosgetinseratejpgService.prototype.getfarosInserat = function (aufnr) {
        var body = '{"request":{"filter":"farosGetInserateJPG%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06firma%05' + this.loginparameter.loginfirma + '"}}';
        var headers = new http_1.Headers({ 'content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: 'POST' });
        return this.http.post(this.loginparameter.loginurl, body, options)
            .map(this.extractData);
    };
    FarosgetinseratejpgService.prototype.extractData = function (res) {
        var resultJson = res.json();
        var result = resultJson.REST[0].messageResponse;
        var resultJson2 = JSON.parse(result);
        var result2 = resultJson2;
        console.log("osgruppennamen", result2);
        return result2;
    };
    FarosgetinseratejpgService = __decorate([
        core_1.Injectable()
    ], FarosgetinseratejpgService);
    return FarosgetinseratejpgService;
}());
exports.FarosgetinseratejpgService = FarosgetinseratejpgService;
