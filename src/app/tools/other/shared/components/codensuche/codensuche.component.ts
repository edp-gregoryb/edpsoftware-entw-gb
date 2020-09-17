import {Component, Inject, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RestGetcodeService} from '../../rest-services/rest-getcode.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RestUpdatecodeService} from '../../rest-services/rest-updatecode.service';
import {RestDeletecodeService} from '../../rest-services/rest-deletecode.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-codensuche',
  templateUrl: './codensuche.component.html',
  styleUrls: ['./codensuche.component.css']
})
export class CodensucheComponent implements OnInit {

  momentanerWert: string;
  ctext: string;
  sprache: string;
  cwert: string;
  cart: string;
  suchresult: any;
  hatcode: boolean = false;
  codefirma: string;
  isSingleClick: boolean = true;

  sortierart: any = {var: 'code_wert', art: 'aufsteigend'};

  @Input() formData: any;
  @Input() codenArt: any;
  @Output() ausgewaehlt = new EventEmitter();

  constructor(private getcodeService: RestGetcodeService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.cart = '*';
    this.cwert = '*';
    this.sprache = 'D';
    this.ctext = '*';

    //falls anfangswerte per @Input erhalten werden, diese einsetzen
    if(this.formData){
      if(this.formData.variabelName && this.formData.zwischenspeicher) {
        if(this.formData.variabelName.startsWith('merkmal')){
          this.momentanerWert = JSON.parse(this.formData.zwischenspeicher).merkmal[this.formData.variabelName.slice(-1) - 1];
        } else if(this.formData.variabelName.startsWith('tt_abozust')) {
          let split = this.formData.variabelName.split(/\[|\]/);
          this.momentanerWert = JSON.parse(this.formData.zwischenspeicher).tt_abozust[split[1]][this.formData.variabelName.slice(this.formData.variabelName.indexOf(']') + 2)];
        } else {
          this.momentanerWert = JSON.parse(this.formData.zwischenspeicher)[this.formData.variabelName];
        }
      }

      if(this.formData.cwert) { this.cwert = this.formData.cwert; }
      if(this.formData.cart) { this.cart = this.formData.cart; }
      if(this.formData.sprache) { this.sprache = this.formData.sprache; }
      if(this.formData.ctext) { this.ctext = this.formData.ctext; }
      if(this.formData.codefirma) { this.codefirma = this.formData.codefirma; }
    } else if (this.codenArt) {
      this.cart = this.codenArt;
    }

    this.getCode();
  }

  getCode() {
    console.log(this.cart, this.cwert, this.ctext, this.sprache);
    this.getcodeService.getCode(this.cart, this.cwert, this.ctext, this.sprache, '*', '*', this.codefirma, 1, 200)
        .subscribe(coden => {
          this.suchresult = coden;
          this.hatcode = true;
          console.log("coden", coden);
        })

  }

  openCodeart(val) {
    this.isSingleClick = true;
    setTimeout(()=>{
      if(this.isSingleClick){
        // val.stopPropagation();
    
        const dialogRef = this.dialog.open(CodeartDialog, {
          width: '1200px',
          data: val
    
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if(result) {
            this.ausgewaehlt.next(result);
          } else {
            this.getCode();
          }
        });
      }
    },250);
  }

  directChoose(item: any) {
    this.isSingleClick = false;
    this.ausgewaehlt.next(parseCodn(item));
  }

  codnAbbrechen() {
    this.ausgewaehlt.next('');
  }

  codnEmpty() {
    this.ausgewaehlt.next('empty');
  }

  sort(_varName: string) {
    if(_varName !== this.sortierart.var || this.sortierart.art === 'absteigend'){
      this.suchresult.sort((a, b) => (a[_varName] >= b[_varName]) ? 1 : -1);
      this.sortierart.art = 'aufsteigend';
    } else {
      this.suchresult.sort((a, b) => (a[_varName] < b[_varName]) ? 1 : -1);
      this.sortierart.art = 'absteigend';
    }
    this.sortierart.var = _varName;
  }
}

function parseCodn(item: any) {
  return {cart: item.code_art, ctext: item.code_text, ctext1: item.code_text1, ctext2: item.code_text2, cwert: item.code_wert, firma: item.firma, kz: item.code_Kz, laenge: item.code_laenge, sprache: item.sprache, stat: 0};
}

@Component({
  selector: 'codeart-dialog',
  templateUrl: 'codeart-dialog.html',
  styleUrls: ['./codensuche.component.css']
})
export class CodeartDialog {

  ctext: string;
  sprache: string;
  cwert: string;
  cart: string;
  ctext1: string;
  ctext2: string;
  firma: number;
  laenge: number;
  kz: number;
  stat: number;
  codeartForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CodeartDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private updatecodeService: RestUpdatecodeService, private deletecodeService: RestDeletecodeService) {
      console.log("codeart", data)

    this.cart = data.code_art;
    this.cwert = data.code_wert;
    this.sprache = data.sprache;
    this.ctext = data.code_text;
    this.ctext1 = data.code_text1;
    this.ctext2 = data.code_text2;
    this.firma = data.firma;
    this.laenge = data.code_laenge;
    this.kz = data.code_Kz;
    this.stat = 0;

     this.codeartForm = this.fb.group({
       cart: [''],
       cwert: [''],
       sprache: [''],
       ctext: [''],
       ctext1: [''],
       ctext2: [''],
       firma: [''],
       laenge: [''],
       kz: [''],
       stat: [''],
     });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCodeart() {
    //console.log("codeartForm", this.codeartForm.value);
    let tempvalue = this.codeartForm.value;
    console.log("codeartForm", tempvalue);
    this.updatecodeService.postCode(tempvalue.cart, tempvalue.cwert, tempvalue.ctext, tempvalue.ctext1, tempvalue.ctext2,
      tempvalue.sprache, tempvalue.kz, tempvalue.stat, tempvalue.firma,  tempvalue.laenge)
      .subscribe(codevalues => {
        console.log("codevalues", codevalues);
    });
  }

  selectCodeart() {
    this.dialogRef.close(this.codeartForm.value);
  }
 
  onSubmit() {
    
  }

  neueCodeart() {
    this.cart = '';
    this.cwert = '';
    this.ctext = '';
    this.ctext1 = '';
    this.ctext2 = '';
    this.kz = 0;
    this.stat = 0;
  }

  deleteCodeart() {
    let tempvalue = this.codeartForm.value;
    this.deletecodeService.delCode(tempvalue.cart, tempvalue.cwert, tempvalue.sprache, tempvalue.firma)
      .subscribe(ret => {
        console.log(ret);
    });
  }
}
