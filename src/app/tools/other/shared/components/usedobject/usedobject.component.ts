import {Component, Inject, OnInit} from '@angular/core';
import {CookieService} from 'ng2-cookies';

import {UsedObjectService} from '../../rest-services/used-object.service';
import {ProduktdetailDialog, SavefrageDialog} from '../home/home.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';


export interface Objektbezeichnung {
  aschlussel: string;
  fehlercode: string;
  fehlertext: string;
  obj_bezeichnung: string;
  objekt: string;
  untertitel: string;
}

@Component({
  selector: 'app-usedobject',
  templateUrl: './usedobject.component.html',
  styleUrls: ['./usedobject.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsedobjectComponent implements OnInit {

  sidenavExpanded: boolean      = false;
  currentAppModule: string      = "WKFL";
  modulename: string            = "Workflow";

  licensedModules: any          = [];
  sidenavmodules: any           = [];

  headerTitle: string           = "Home";
  headerLinkBack: string        = "workflow/workflow-show";
  vlpdBerecht: boolean = false;
  columnsToDisplay: string[] = [ 'obj_bezeichnung'];
  selection = new SelectionModel<Objektbezeichnung>(true, []);
  dataSource = new MatTableDataSource<Objektbezeichnung>();
  expandedElement: Objektbezeichnung | null;
  innerheight: number;
  private objekt: string;
  private aschlussel: string;
  rownumber: number;


  constructor(private cookieService: CookieService, private usedObjectService: UsedObjectService, public dialog: MatDialog) { }

  ngOnInit() {

    var tempfilelocalstorage = this.cookieService.get('currentUser');
    if(tempfilelocalstorage) {
      let userjson = JSON.parse(atob(tempfilelocalstorage));
      let licensedModulestemp  = userjson[0].module;

      for (let row of  licensedModulestemp){
        this.licensedModules.push(row);
        if (row.shorthand === this.currentAppModule) {
          this.modulename = row.name;
        }

        if (row.show){
          this.sidenavmodules.push(row);
        }
      }

      //checkt ob workflow-editor-berechtigung vorhanden ist
      for (let i = 0; i < userjson[0].berecht.length; i++) {
        if(userjson[0].berecht[i] === 'VLPD'){
          this.vlpdBerecht = true;
        }
      }

      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
    }
    this.innerheight = self.innerHeight-160;

    this.usedObjectService.getUsedObjekt(0)
        .subscribe(o => {
          console.log('usedobject', o)
          this.dataSource.data = o;
        })

  }
  windowResize(){
    this.innerheight = self.innerHeight - 160;
  }

  openProduktdetail( val) {
    val.stopPropagation();
    const dialogRef = this.dialog.open(ProduktdetailDialog, {
      width: '1200px',
      height: this.innerheight + 'px',
      data: {objekt: this.objekt, aschlussel: this.aschlussel}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  getrow(element: any) {
    this.objekt = "";
    this.aschlussel = "";
    console.log("element", element)

    this.objekt = element.objekt;
    this.usedObjectService.getProduktAschlussel(element.objekt)
        .subscribe(a => {
          console.log("aschlussel", a)
          if (a) {
            this.aschlussel = a[0].aschlussel;
            this.usedObjectService.getProdArtikel(element.objekt, a[0].aschlussel)
                .subscribe(artaufgabe => {
                  console.log('getartikel', artaufgabe)
                })

          } else {
            console.log("kein aschlussel vorhanden!!");
          }
          })
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   console.log(numRows)
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  // setAll(val, row) {
  //   //this.rownumber = index;
  //   console.log(val, row)
  //   if (row) {
  //     this.getrow(row);
  //   }
  // }

  // checkboxLabel(row) {
  //  // console.log(row.objekt)
  //   if (row.checked) {
  //     console.log(row)
  //     // return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   // console.log(row.objekt)
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} `;
  // }

  openProduktinfo(val) {
    if (this.objekt && this.aschlussel) {
      const dialogRef = this.dialog.open(ProduktInfoDialog, {
        width: '1200px',
        data: {objekt: this.objekt, aschlussel: this.aschlussel}

      });
    } else {
      console.log("objke und aschlussel leer!!")
    }

  }
}

@Component({
  selector: 'savefrage-dialog',
  templateUrl: 'produkt-info-dialog.html',
})
export class ProduktInfoDialog  {
objekt: string;
aschlussel: string;
  constructor(
      public dialogRef: MatDialogRef<ProduktInfoDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.objekt = data.objekt;
    this.aschlussel = data.aschlussel;
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
