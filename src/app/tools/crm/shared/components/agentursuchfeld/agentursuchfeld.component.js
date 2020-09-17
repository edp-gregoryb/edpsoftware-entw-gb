"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AgentursuchfeldComponent = (function () {
    function AgentursuchfeldComponent(agenturkundeService, adrvermittlerService) {
        this.agenturkundeService = agenturkundeService;
        this.adrvermittlerService = adrvermittlerService;
        this.isActiveAgentur = false;
        this.plusminus = '+';
        this.agenturvalueChanged = new core_1.EventEmitter();
    }
    AgentursuchfeldComponent.prototype.ngOnInit = function () {
        if (this.agenturdata) {
            this.bznragentur = this.agenturdata[0].agenturbeznr;
            this.fnameagentur = this.agenturdata[0].agenturname;
            this.zusatz1agentur = this.agenturdata[0].agenturzusatz1;
            this.zusatz2agentur = this.agenturdata[0].agenturzusatz2;
            this.strasseagentur = this.agenturdata[0].agenturstrasse;
            this.ortagentur = this.agenturdata[0].agenturort;
            this.agenturvalueChanged.next({ value: this.agenturdata[0].agenturbeznr });
            console.log("this.agenturdata[0].agenturbeznr");
            this.isActiveAgentur = true;
            this.plusminus = '-';
        }
    };
    AgentursuchfeldComponent.prototype.changeAgentur = function (event) {
        var _this = this;
        //console.log("event",event);
        this.adrvermittlerService.showvermittler(event.query)
            .subscribe(function (agentur) {
            _this.agenturdata = agentur;
            console.log(_this.agenturdata);
        }, function (err) {
            console.error(err);
        });
    };
    AgentursuchfeldComponent.prototype.agenturwechseln = function (agentur) {
        console.log("kundewechseln", agentur);
        this.bznragentur = agentur.beznr;
        this.agenturvalueChanged.next({ value: agentur.beznr });
        /*this.nameagentur = agentur.fname;
        this.strasseagentur = agentur.strasse;
        this.ortagentur = agentur.ort;*/
    };
    AgentursuchfeldComponent.prototype.selectedvalueagentur = function (agentur) {
        console.log("agentur", agentur);
        this.agenturvalueChanged.next({ value: agentur.beznr });
        this.bznragentur = agentur.beznr;
        this.fnameagentur = agentur.fname;
        this.vnameagentur = agentur.vname;
        this.zusatz1agentur = agentur.zusatz1;
        this.zusatz2agentur = agentur.zusatz2;
        this.zusatz3agentur = agentur.zusatz3;
        this.strasseagentur = agentur.strasse;
        this.ortagentur = agentur.ort;
    };
    AgentursuchfeldComponent.prototype.agentureditieren = function () {
        if (this.isActiveAgentur === false) {
            this.isActiveAgentur = true;
            this.plusminus = '-';
        }
        else {
            this.isActiveAgentur = false;
            this.plusminus = '+';
        }
    };
    AgentursuchfeldComponent.prototype.showagentur = function () {
        var _this = this;
        this.agenturkundeService.showagenturkude(this.beznr, this.objekt)
            .subscribe(function (agentur) {
            _this.agenturdata = agentur;
            console.log(_this.agenturdata);
        }, function (err) {
            console.error(err);
        });
    };
    __decorate([
        core_1.Input()
    ], AgentursuchfeldComponent.prototype, "agenturdata");
    __decorate([
        core_1.Input()
    ], AgentursuchfeldComponent.prototype, "objekt");
    __decorate([
        core_1.Input()
    ], AgentursuchfeldComponent.prototype, "beznr");
    __decorate([
        core_1.Output()
    ], AgentursuchfeldComponent.prototype, "agenturvalueChanged");
    AgentursuchfeldComponent = __decorate([
        core_1.Component({
            selector: 'app-agentursuchfeld',
            templateUrl: './agentursuchfeld.component.html',
            styleUrls: ['./agentursuchfeld.component.css']
        })
    ], AgentursuchfeldComponent);
    return AgentursuchfeldComponent;
}());
exports.AgentursuchfeldComponent = AgentursuchfeldComponent;
