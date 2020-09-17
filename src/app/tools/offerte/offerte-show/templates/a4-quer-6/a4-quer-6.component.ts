import {Component, OnInit, Input} from '@angular/core';
import {Validators, FormGroup, FormArray, FormBuilder, FormControl, NgModel} from '@angular/forms';
import {Instanztemplatedata} from '../../instanztemplatedata';
import {FindandaddPipe} from '../../../shared/pipes/findandadd.pipe';
import {WhprozentPipe} from '../../../shared/pipes/whprozent.pipe';
import {SPprozentPipe} from '../../../shared/pipes/spprozent.pipe';
import {SPfrankenPipe} from '../../../shared/pipes/spfranken.pipe';


@Component({
    selector: 'app-a4-quer-6',
    templateUrl: './a4-quer-6.component.html',
    styleUrls: ['./a4-quer-6.component.css']
})
export class A4Quer6Component implements OnInit {

    totalpreis: any = [];
    pzgptotal: any = [];
    valuevonWR: any;

    constructor() {
    }


    @Input() verkaufsdokument: FormGroup;
    @Input() instanz: string;                   // nur bis alles auf Instanztemplatedata umgestellt
    @Input() templatedata: Instanztemplatedata;

    ngOnInit() {
        //this.totalpreis = this.totalpreissumme();
//   console.log("this.pzgptotal",this.pzgptotal);

    }

    // Template-Helperfunktionen
    // =========================

    erscheinungsdatenAufbereiten(text: string[], count: number) {
        let list: string = '';
        for (let item of text) {
            if (item != '') {
                if (list === '') {        // Liste ist leer, daher direkt neues Element einfügen und - falls nur ein Element einzufügen ist - Routine beenden
                    list += item;
                    if (count == 1) break;
                }
                else list += ', ' + item; // mindestens ein Element besteht bereits, daher muss ein Komma und ein Space vor dem neuen Element eingefügt werden
            }
        }
        return list;
    }

    // Finden einer bestimmten Preisposition anhand eines Keys
    findValue(preisposarray: any, key: string) {
        for (var i = 0; i < preisposarray.length; i++) {
            if (preisposarray[i].posKey == key) {
                // console.log(" preisposarray[i]", preisposarray[i]);
                return preisposarray[i];
            }
        }
        return '';
    }


    getSum(total, num) {
        return total + num;
    }




    getTasks(verkaufsdokument) {
        return verkaufsdokument.get('titel').controls;
    }

}
