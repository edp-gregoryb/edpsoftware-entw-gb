import {AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MerkmalbasisService} from '../../../../crm/shared/services/merkmalbasis.service';
import {MerkmaleService} from '../../../../crm/shared/services/merkmale.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';




export interface merkmaltab {
  mkmartBez: string;
  mkmerk1Bez: string;
  mkmerk2Bez: string;
  mkmerk3Bez: string;
}

@Component({
  selector: 'app-merksuche',
  templateUrl: './merksuche.component.html',
  styleUrls: ['./merksuche.component.css']
})
export class MerksucheComponent implements OnInit {

  @Output() selectemerkmals = new  EventEmitter();
  @Output() selectemerkmalsohne = new  EventEmitter();
  @Output() deletemerkmal = new  EventEmitter();
  @Output() deletemerkmalohne = new  EventEmitter();
  @Input() idmerk: string;

  merkmalart: string;
  merkmal1: string;
  merkmal2: string;
  merkmal3: string;


  kriteriumausgabe: any;

  merkmallist: any;

  dialogRef: MatDialogRef<any>;


  public filter: FormGroup;



  constructor(private merkmalbasisService: MerkmalbasisService, private merkmaleService: MerkmaleService, public dialog: MatDialog,
              public viewContainerRef: ViewContainerRef, private fb: FormBuilder) {
    this.filter = fb.group({
      'itemforsearch': fb.array([])
    });
  }

  ngOnInit() {

  }





  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected() ?
    // this.selection.clear() :
    // this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getMerkmale() {
    if (this.merkmalart || this.merkmal1 || this.merkmal2 || this.merkmal3) {
      this.merkmalbasisService.searchMerkmale(this.merkmalart, this.merkmal1 , this.merkmal2 , this.merkmal3)
          .subscribe(merkmal => {
            // console.log("merkmal", merkmal);
            this.merkmallist = merkmal;

            // this.dataSource.data =  merkmal;//new MatTableDataSource<merkmaltab>(merkmal);

            let config = new MatDialogConfig();
            config.viewContainerRef = this.viewContainerRef;

            this.dialogRef = this.dialog.open(MerksucheDialog, {
              height: '700px',
              width: '1300px',
              data: merkmal
            });
            // this.dialogRef.componentInstance = val;

            this.dialogRef.afterClosed().subscribe(result => {
              // this.dialogRef = null;
              console.log("result",result);
              this.kriteriumausgabe = result;

              this.additemforsearcha(result);
            });

            // console.log("this.datasouce", this.dataSource.data);
          });
    }
  }


  public additemforsearcha(val):void {
    console.log("val",val);
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
    for (let item of val) {
      itemforsearch.push(this.fb.group({
        art: [item.mkmartBez],
        merk1: [item.mkmerk1Bez],
        merk2: [item.mkmerk2Bez],
        merk3: [item.mkmerk3Bez],
        mkmart: [item.mkmart],
        mkmerk1: [item.mkmerk1],
        mkmerk2: [item.mkmerk2],
        mkmerk3: [item.mkmerk3]
      }));
    }
    console.log("idmerk", this.idmerk);
    if (this.idmerk === 'mitKrit') {
      this.selectemerkmals.next(itemforsearch.value);
    } else {
      this.selectemerkmalsohne.next(itemforsearch.value);
    }



  }

  public deleteitemforsearch(val): void {
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
    itemforsearch.removeAt(val );
    if (this.idmerk === 'mitKrit') {
      this.deletemerkmal.next(itemforsearch.value);
    } else {
      this.deletemerkmalohne.next(itemforsearch.value);
    }
  }

}

@Component({
  selector: 'merksuche-dialog',
  templateUrl: 'merksuche.component.dialog.html',
  styleUrls: ['./merksuche.component.css']
})
export class MerksucheDialog implements AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [];

  selectedRow;

  selection = new SelectionModel<any>(true, []);

  constructor(
      public dialogRef: MatDialogRef<MerksucheDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

      this.displayedColumns = ['select', 'mkmartBez', 'mkmerk1Bez', 'mkmerk2Bez', 'mkmerk3Bez'];

      this.dataSource.data = data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    // console.log("numSelected", this.selection.selected.length);
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
       this.dataSource.data.forEach(row => this.selection.select(row));
    console.log("this.selection.select(row)", this.selection.changed);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      // console.log('auswahl', this.selection.selected);
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  selectRow(row) {

    this.selectedRow = row;
  }
}
