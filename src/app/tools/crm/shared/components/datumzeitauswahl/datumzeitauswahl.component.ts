import {Component, OnInit, Input} from '@angular/core';


@Component({
    selector: 'app-datumzeitauswahl',
    templateUrl: './datumzeitauswahl.component.html',
    styleUrls: ['./datumzeitauswahl.component.css']
})
export class DatumzeitauswahlComponent implements OnInit {
    @Input() dateValuenewfromdb: any;
    @Input() timeValuenewfromdb: any;
    @Input() datumToday: string;
    dateValuenew: any;
    timeValuenew: any;

    constructor() {

    }

    ngOnInit() {
        console.log("datumToday", this.datumToday);
        if (this.datumToday === '') { }
        else {
            if (this.dateValuenewfromdb) {
                this.dateValuenew = this.dateValuenewfromdb;
            } else {
                this.dateValuenew = new Date().toISOString().split('T')[0];
                // console.log("dateValuenew", this.dateValuenew);
            }

        }
            if (this.timeValuenewfromdb) {
                this.timeValuenew = this.timeValuenewfromdb;
            }



    }

}
