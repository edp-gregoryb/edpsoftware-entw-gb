import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FisVLObjektdetailsService} from '../../rest-services/fis-vlobjektdetails.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestVlupdtobjektService} from '../../rest-services/rest-vlupdtobjekt.service';
import {RestGetcodeService} from '../../rest-services/rest-getcode.service';

@Component({
  selector: 'app-shoptexte',
  templateUrl: './shoptexte.component.html',
  styleUrls: ['./shoptexte.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-CH'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},

  ]
})
export class ShoptexteComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>()
  shopForm: FormGroup;
  @Input() objektparameter: any;
  suchresult: any;
  suchresult2: any;
  suchresult3: any;
  suchresult4:any;
  codefirma: string;
  ctext: string;
  sprache: string;
  cwert: string;
  cart: string;

  constructor(private fisVLObjektdetailsService: FisVLObjektdetailsService, private fb: FormBuilder,
              private vlupdtobjektService: RestVlupdtobjektService, private getcodeService: RestGetcodeService) { }

  ngOnInit() {


    this.shopForm = this.fb.group({
      ISBN: [''],
      // aboartik: [''],
      artgrp: [''],
      // artgrptext: [''],
      // artmerk1: [''],
      // artmerk1text: [''],
      // artmerk2: [''],
      // artmerk2text: [''],
      // artmerk3: [''],
      // artmerk3text: [''],
      // artmerk4: [''],
      // artmerk4text: [''],
      // artmerk5: [''],
      // artmerk5text: [''],
      // asflag: [''],
      // autor: [''],
      // autortext: [''],
      barcode: [''],
      // erscheinung: [''],
      // erscheinen: [''],
      // erscheinungtext: [''],
      fremdschluessel: [''],
      // hidden: [''],
      // merkmal1: [''],
      // merkmal1text: [''],
      // merkmal2: [''],
      // merkmal2text: [''],
      // obj_sprache: [''],
      // obj_sprachetext: [''],
      // objart: [''],
      // objarttext: [''],
      // objbez2: [''],
      //  objbezeichnung: [''],
      objekt: [''],
      // objgrp: [''],
      // objgrptext: [''],
      // objkurzbez: [''],
      praesgrp: [''],
      // praesgrptext: [''],
      praessubgrp: [''],
      // praessubgrptext: [''],
      // sort: [''],
      // sprache: [''],
      // statustext: [''],
      // text1: [''],
      // text2: [''],
      // warenkorb: [''],
      // zusatztext: [''],
      // zusatztext2: [''],
      // publikation: [''],
      // publikationsdatum: [''],
      // herausgeber: [''],
      // permalinkid: [''],
      // doi_nummer: [''],
      // openaccess: [''],
      // stat: [''],
      // objstattxt: [''],
      ISSN: [''],
      objtyp: [''],
      vlartik: ['']
      // reihe: [''],
      // ausgabe: [''],
      // seitenzahl: [''],
      // erschort: ['']
      // ,
      // auflage: ['']
    })
    if (this.objektparameter) {
      this.preloadData(this.objektparameter, "SRF");
    }

    this.cwert = '*';
    this.sprache = 'D';
    this.ctext = '*';
    this.getCode('VLPRGRP');
    this.getCode('VLPRSGRP');
    this.getCode('VLARTGRP');
    this.getCode('itobjtyp');

    this.formReady.emit(this.shopForm);
  }

  preloadData(obj, curr) {
    console.log("obj", obj);
    this.fisVLObjektdetailsService.getObjektDetails(obj, curr)
        .subscribe(temp => {
          this.shopForm.patchValue(temp[0]);
          console.log(temp);
        })
  }

  updateObjForm() {

    this.onSubmit();
    // this.vlupdtobjektService.putVlOpjekt(this.shopForm.value)
    //     .subscribe(update => {
    //       console.log("RestVlupdtobjektService", update);
    //     })

  }

  getCode(cart) {
    console.log('getCode', cart, this.cwert, this.ctext, this.sprache);

    this.getcodeService.getCode(cart, this.cwert, this.ctext, this.sprache, '*', '*', this.codefirma, 1, 200)
        .subscribe(coden => {

          console.log("coden", coden);
          if (cart === 'VLARTGRP') {
            this.suchresult =  coden;
          } else if (cart === 'VLPRGRP') {
            this.suchresult2 =  coden;
          } else if (cart === 'VLPRSGRP') {
            this.suchresult3 =  coden;
          } else if (cart === 'itobjtyp') {
            this.suchresult4 =  coden;
          }
        });
  }

  onSubmit() {

    console.log(this.shopForm.value);
  }

  changeCoden(val) {
    this.shopForm.get('artgrp').setValue(val, {
      onlyself: true
    })
  }


  changeCodenPrasentation(val) {
    this.shopForm.get('praesgrp').setValue(val, {
      onlyself: true
    })
  }


  changeCodenPrasentationSub(val) {
    this.shopForm.get('praessubgrp').setValue(val, {
      onlyself: true
    })
  }

  changeCodenObjtyp(val) {
    this.shopForm.get('objtyp').setValue(val, {
      onlyself: true
    })
  }
}
