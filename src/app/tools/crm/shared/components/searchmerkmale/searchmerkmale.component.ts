import {Component, Inject, OnInit} from '@angular/core';
import { MerkmalbasisService } from '../../services/merkmalbasis.service';
import { MerkmaladdService } from '../../services/merkmaladd.service';
import { MerkmaldeleteService } from '../../services/merkmaldelete.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-searchmerkmale',
  templateUrl: './searchmerkmale.component.html',
  styleUrls: ['./searchmerkmale.component.css']
})
export class SearchmerkmaleComponent implements OnInit {
  merkmalsuchtext:string;
 
  merkmalsuchtext1:string;

  merkmalsuchtext2:string;
 
  merkmalsuchtext3:string;
  data:any;
  kundenbez:string;
  merkmalsuchlist:any;

  // types: SelectItem[];
  showaddedmerkmal:boolean = false;
  merkmalarray:string [] = [];

    displayedColumns = ['mkmart', 'mkmerk1', 'mkmerk1Bez', 'mkmerk2', 'mkmerk2Bez', 'mkmerk3', 'mkmerk3Bez'];
    dataSource = new MatTableDataSource();
  
  constructor(private merkmalbasisService:MerkmalbasisService, private merkmaladdService:MerkmaladdService,
  private merkmaldeleteService: MerkmaldeleteService, public dialogRef: MatDialogRef<any>) {
    // this.types = [];
    // this.types.push({label: 'Kunde', value: this.kundenbez});
    //     this.types.push({label: 'Konktperson', value: 'Konktperson'});
    
  }

  ngOnInit() {
    this.data = this.dialogRef.componentInstance;
    this.kundenbez = this.data.param1;
    // console.log("beznrkunde",this.kundenbez);
  }
 
  
  searchmerkmale() {
    var art = "";
    if (this.merkmalsuchtext){
      art = this.merkmalsuchtext;
    }
    var merk1 ="";
    if (this.merkmalsuchtext1){
      merk1 = this.merkmalsuchtext1;
    }
    var merk2 ="";
    if (this.merkmalsuchtext2){
      merk2 = this.merkmalsuchtext2;
    }
    var merk3="";
    if (this.merkmalsuchtext3){
      merk3 = this.merkmalsuchtext3;
    }
    this.merkmalsearch(art,merk1,merk2,merk3);
  }

  merkmalsearch(merkmal, merkmal1, merkmal2, merkmal3) {
    if (merkmal || merkmal1 || merkmal2 || merkmal3){
    this.merkmalbasisService.searchMerkmale(merkmal, merkmal1, merkmal2, merkmal3)
          .subscribe(merkmale => {
              this.dataSource.data = merkmale;
          }, err => {
            console.error(err);
          });
    } else {
      console.log("kein Kriterium ausgewählt");
    }
  }
  
  onRowSelect(val){
      this.showaddedmerkmal = true;
      this.merkmalarray.push(val);
      console.log(this.dataSource.data.findIndex(d => d === val));
      let index: number = this.dataSource.data.findIndex(d => d === val);
      this.dataSource.data.splice(index,1);
      this.dataSource._updateChangeSubscription();
  }

    onKeydown(event) {
        // console.log(event);
        if (event.key === "Enter") {
            // console.log(event);
            this.searchmerkmale();
        }
    }

  addMerkmale(val) {
      console.log('addMerkmale', val);
      let tempstring = val.toString().split(',');
      console.log('tempstring', tempstring);

      if (tempstring.length > 0) {
          this.merkmaladdService.addMerkmal(this.kundenbez, val.mkmart, val.mkmerk1, val.mkmerk2, val.mkmerk3)
              .subscribe(merkmaleadd => {
                    console.log('addMerkmale', merkmaleadd);
              }, err => {
                  console.error(err);
              });
      }

      // 0: "01" mkmerk1
      // 1: " Merkmal 1"
      // 2: " 105" mkmerk2
      // 3: " Haus"
      // 4: " 10520" mkmerk3
      // 5: " Heimtextilien (Bad"
      // 6: " Bettwäsche ...)"
      // 7: " BRANCHE" mkmart

      // fehlercode: "00"
      // fehlertext: ""
      // firma: 0
      // mkmart: "BRANCHE"
      // mkmartBez: "Branche"
      // mkmerk1: "01"
      // mkmerk1Bez: "Merkmal 1"
      // mkmerk2: "120"
      // mkmerk2Bez: "Fahrzeuge"
      // mkmerk3: "12001"
      // mkmerk3Bez: "Personenwagen (Neuwagen)"
  }

    deleteItem(val) {
        this.merkmalarray.splice(val, 1);
    }

    saveMerkmale(val) {
      console.log('merkmal',val);
        if (val) {
            for (let item of val) {
                this.addMerkmale(item);
            }
            this.dialogRef.close();
        }
    }
}






