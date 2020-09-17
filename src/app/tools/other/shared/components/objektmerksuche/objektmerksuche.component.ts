import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ObjektauswahlService} from '../../../../shared/services/objektauswahl.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-objektmerksuche',
  templateUrl: './objektmerksuche.component.html',
  styleUrls: ['./objektmerksuche.component.css']
})
export class ObjektmerksucheComponent implements OnInit {

  @Output() selecteobjektsa = new EventEmitter();
  @Output() selecteobjektsb = new EventEmitter();
  @Output() deleteobjektsa = new EventEmitter();
  @Output() deleteobjektsb = new EventEmitter();
  objektauswahl_1: Array<string> = [];

  public filter: FormGroup;
  public filterb: FormGroup;
  formctrl = new FormControl();

  constructor(private objektauswahlService: ObjektauswahlService, public dialog: MatDialog, private fb: FormBuilder) {

      this.filter = fb.group({
          'itemforsearch': fb.array([])
      });

      this.filterb = fb.group({
          'itemforsearchb': fb.array([])
      });
  }

  ngOnInit() {
    this.objektauswahlService.showObjekt('','')
        .subscribe(obj => {
          console.log("obj", obj);
          this.objektauswahl_1 = obj;

        })

  }

    openDialog(flag: string): void {
        const dialogRef = this.dialog.open(ObjektmerksuchedialogComponent, {
            width: '400px',
            height: '700px',
            data: {data: this.objektauswahl_1, flag: flag}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result.flag === 'a') {
                this.additemforsearcha(result.selected);
            } else {
                this.additemforsearchb(result.selected);
            }


        });
    }

    public additemforsearcha(val):void {
        console.log("val",val);
        const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
        for (let item of val) {
            itemforsearch.push(this.fb.group({
                objekt: [item.objekt],
                objektbez: [item.obj_bezeichnung]
            }));
        }
        this.selecteobjektsa.next(itemforsearch.value);

    }

    public additemforsearchb(val):void {
        console.log("val",val);
        const itemforsearch = this.filterb.controls['itemforsearchb'] as FormArray;
        for (let item of val) {
            itemforsearch.push(this.fb.group({
                objekt: [item.objekt],
                objektbez: [item.obj_bezeichnung]
            }));
        }
        this.selecteobjektsb.next(itemforsearch.value);

    }

    public deleteitemforsearch(val): void {
        const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
        itemforsearch.removeAt(val );
        this.deleteobjektsa.next(itemforsearch.value);
    }

    public deleteitemforsearchb(val): void {
        const itemforsearch = this.filterb.controls['itemforsearchb'] as FormArray;
        itemforsearch.removeAt(val );
        this.deleteobjektsb.next(itemforsearch.value);
    }

}


@Component({
    selector: 'objektmerksuchedialog',
    templateUrl: './objektmerksuchedialog.component.html',
    styleUrls: ['./objektmerksuche.component.css']
})
export class ObjektmerksuchedialogComponent {



    objektauswahl:any;
    selecteditems: any = [];
    flagauswahl:any;

    selectedOptions: any;

    constructor(
        public dialogRef: MatDialogRef<ObjektmerksuchedialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log("data", data);
        this.objektauswahl = data.data;
        this.flagauswahl = data.flag;
    }

    onNoClick(): void {
        this.dialogRef.close({selected: this.selecteditems, flag: this.flagauswahl});
    }

    selectItem(objstatus, obj) {
        if (objstatus === 'unchecked') {
            this.selecteditems.push(obj);
        } else {
            for( var i = 0; i < this.selecteditems.length; i++){
                if ( this.selecteditems[i].objekt === obj.objekt) {
                    this.selecteditems.splice(i, 1);
                }
            }

        }

        // console.log("this.selected", obj);
    }


}
