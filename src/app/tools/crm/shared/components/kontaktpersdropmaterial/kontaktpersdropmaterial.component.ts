import {Component, OnInit, Input, Output, EventEmitter, OnChanges, Inject, ViewChild} from '@angular/core';
import {KontaktpersonService} from '../../services/kontaktperson.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {RestDeleteadrzuService} from '../../../../other/shared/rest-services/rest-deleteadrzu.service';
import {transformMenu} from '@angular/material/menu';



@Component({
    selector: 'app-kontaktpersdropmaterial',
    templateUrl: './kontaktpersdropmaterial.component.html',
    styleUrls: ['./kontaktpersdropmaterial.component.css']
})
export class KontaktpersdropmaterialComponent implements OnInit , OnChanges {
    kontaktpersondata: any;
    @Input() kontaktpers: any;
    @Input() kundenNr: any;
    @Input() vermit: any;
    @Input() objekt: any = '';
    @Output() kontaktpersonChanged = new EventEmitter();
    @ViewChild('mySelect', { static: false }) mySelect: any;
    detberecht:any;
    new: boolean;
    update: boolean;
    delete: boolean;

    panelOpen: boolean;


    constructor(private kontaktpersonService: KontaktpersonService, public dialog: MatDialog,
                private deleteadrzuService: RestDeleteadrzuService) {
        let tempdetberecht = sessionStorage.getItem("detberecht");
        if (tempdetberecht) {
            this.detberecht = JSON.parse(tempdetberecht);
            console.log("detberecht", this.detberecht);
            for (let berecht of this.detberecht) {
                if (berecht.funkt === "ADZU") {
                    console.log(berecht.detberecht);
                    if (berecht.detberecht[0] === "J") {
                        this.new = true;
                    } else {
                        this.new = false;
                    }
                    if (berecht.detberecht[1] === "J") {
                        this.update = true;
                    } else {
                        this.update = false;
                    }
                    if (berecht.detberecht[2] === "J") {
                        this.delete = true;
                    } else {
                        this.delete = false;
                    }
                }
            }
        }
    }

    ngOnChanges() {

        console.log('kontaktpers', this.kontaktpers, this.kundenNr, this.vermit, this.objekt);


        if (this.vermit !== undefined) {
            this.kontaktpersonService.showkontaktperson(this.kundenNr, this.vermit, this.objekt)
                .subscribe(kontaktpers => {
                    this.kontaktpersondata = kontaktpers;

                    if (this.kontaktpersondata.length <= 1) {
                        console.log('kontaktpersondata', this.kontaktpersondata)
                        this.delete = false;
                        this.update = false;
                    } else {
                        this.delete = true;
                        this.update = true;
                    }
                }, err => {
                    console.error(err);
                });
        } else {
            this.kontaktpersonService.showkontaktperson(this.kundenNr, '', this.objekt)
                .subscribe(kontaktpers => {
                    this.kontaktpersondata = kontaktpers;
                    console.log('kontaktpersondata', this.kontaktpersondata)
                    if (this.kontaktpersondata.length <= 1) {
                        console.log('kontaktpersondata', this.kontaktpersondata)
                        this.delete = false;
                        this.update = false;
                    } else {
                        this.delete = true;
                        this.update = true;
                    }
                    // this.panelOpen = this.mySelect.focused;
                }, err => {
                    console.error(err);
                });
        }
    }

    ngOnInit() {
         this.panelOpen = false;
    }


    selectedKontaktperson(kontaktvalue) {
        if (kontaktvalue) {
            //console.log('kontaktvalue', kontaktvalue)
            this.kontaktpersonChanged.next({value: kontaktvalue.value});

        }
    }

    openmenu(val, gesname) {
        val.stopPropagation();
        console.log('gesname', gesname)
        if (gesname === 'leer') {
            this.delete = false;
            this.update = false;
        } else {
            this.delete = true;
            this.update = true;
        }
    }

    updateKontaktpers(val) {
        console.log("kontaktpersupdate", val);
        const dialogRef = this.dialog.open(ZustandigerDialog, {
            width: '900px',
            data: {zustanigerdnr: val.beznr}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result) {
                this.kontaktpersonChanged.next({value: result.tt_adrzu[0].beznr, 'timestamp': new Date().getMilliseconds()});
                this.kontaktpers = result.tt_adrzu[0].beznr;
            }
            this.ngOnChanges();
            this.mySelect.close();
        });


    }

    neueKontaktpers() {
        const dialogRef = this.dialog.open(ZustandigerDialog, {
            width: '900px',
            data: {bbezner: this.kundenNr}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result) {
                console.log('result.tt_adrzu[0].beznr', result.tt_adrzu[0].beznr)
                this.kontaktpersonChanged.next({value: result.tt_adrzu[0].beznr});
                this.kontaktpers = result.tt_adrzu[0].beznr;
            }

            this.ngOnChanges();
            this.mySelect.close();
        });
    }

    deletekontaktpers(val) {
        console.log("deletekontaktpers", val);
        if (val) {
            this.deleteadrzuService.delAdrzu(val.beznr)
                .subscribe(deleteadress => {
                    console.log("deleteadress", deleteadress);
                    this.kontaktpersonChanged.next({value: 0});
                    this.ngOnChanges();
                    this.mySelect.close();
                })
        } else {
            console.log("keine beznr");
        }
    }

    showupdatedelneu(val) {
        this.panelOpen = val;
    }
}


@Component({
    selector: 'zustandiger-dialog',
    templateUrl: 'zustandiger-dialog.html',
})
export class ZustandigerDialog {
    zustandignummer: any;
    bbezner: any;

    constructor(
        public dialogRef: MatDialogRef<ZustandigerDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log("data", data);

        if (data.zustanigerdnr) {
            this.zustandignummer = data.zustanigerdnr;
        } else if (data.bbezner) {
            this.bbezner = data.bbezner;
        }

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    zustandigeruber(val) {
        console.log('zustandigeruber', val);
        this.dialogRef.close(val);
    }
}
