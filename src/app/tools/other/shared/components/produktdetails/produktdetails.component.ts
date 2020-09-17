import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FisVLObjektdetailsService} from '../../rest-services/fis-vlobjektdetails.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestVlupdtobjektService} from '../../rest-services/rest-vlupdtobjekt.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {RestGetcodeService} from '../../rest-services/rest-getcode.service';



@Component({
  selector: 'app-produktdetails',
  templateUrl: './produktdetails.component.html',
  styleUrls: ['./produktdetails.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-CH'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},

  ]
})
export class ProduktdetailsComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>()
  @Input() objektparameter: any;
  @Input() sprachdaten: Array<any>;
  @Input() objekt: any;
  @Input() permalinkvorschlag: string;
  objektForm: FormGroup;

  tabs: Array<string> = [];

  ctext: string;
  sprache: string;
  cwert: string;
  cart: string;

  codefirma: string;

  _permalinkid: string;

  constructor(private fisVLObjektdetailsService: FisVLObjektdetailsService, private fb: FormBuilder,
              private vlupdtobjektService: RestVlupdtobjektService) { }

  ngOnInit() {

    this.objektForm = this.fb.group({
      // ISBN: [''],
      aboartik: [''],
      // artgrp: [''],
      artgrptext: [''],
      artmerk1: [''],
      artmerk1text: [''],
      artmerk2: [''],
      artmerk2text: [''],
      artmerk3: [''],
      artmerk3text: [''],
      artmerk4: [''],
      artmerk4text: [''],
      artmerk5: [''],
      artmerk5text: [''],
      asflag: [''],
      autor: [''],
      autortext: [''],
      // barcode: [''],
      erscheinung: [''],
      erscheinen: [''],
      erscheinungtext: [''],
      // fremdschluessel: [''],
      hidden: [''],
      merkmal1: [''],
      merkmal1text: [''],
      merkmal2: [''],
      merkmal2text: [''],
      obj_sprache: [''],
      obj_sprachetext: [''],
      objart: [''],
      objarttext: [''],
      objbez2: [''],
      objbezeichnung: [''],
      // objekt: [''],
      objgrp: [''],
      objgrptext: [''],
      objkurzbez: [''],
      // praesgrp: [''],
      praesgrptext: [''],
      // praessubgrp: [''],
      praessubgrptext: [''],
      sort: [''],
      sprache: [''],
      statustext: [''],
      // text1: [''],
      // text2: [''],
      warenkorb: [''],
      zusatztext: [''],
      zusatztext2: [''],
      publikation: [''],
      publikationsdatum: [''],
      herausgeber: [''],
      permalinkid: [''],
      doi_nummer: [''],
      openaccess: [''],
      stat: [''],
      objstattxt: [''],
      // issn: [''],
      // obity: [''],
      reihe: [''],
      ausgabe: [''],
      seitenzahl: [''],
      erschort: [''],
      auflage: [''],
      jahrgang: [''],
      jahr: ['']
    })
    if (this.objektparameter) {
      this.preloadData(this.objektparameter, "SRF");
    }
    console.log("objektparameter", this.objektparameter);




    this.formReady.emit(this.objektForm);
  }




  preloadData(obj, curr) {
    console.log("obj", obj);
    this.fisVLObjektdetailsService.getObjektDetails(obj, curr)
        .subscribe(temp => {

          this.objektForm.patchValue(temp[0]);
         console.log(temp);
          this._permalinkid = temp[0].permalinkid;
        })
}

  onSubmit() {

     console.log(this.objektForm.value);
  }

  updateObjForm() {

    this.onSubmit();

    // this.vlupdtobjektService.putVlOpjekt(this.objektForm.value)
    //     .subscribe(update => {
    //       console.log("RestVlupdtobjektService", update);
    //     })

  }

  pidVorschlag() {
    if (!this._permalinkid) {
      this.objektForm.patchValue({permalinkid: this.permalinkvorschlag});
    }
    // console.log(this.objektForm.value.permalinkid)
  }

  changeOpenaccess(val) {
    console.log('changeOpenaccess',val.checked)
    if (val.checked === true) {
      this.objektForm.patchValue({openaccess: 'yes'});
    } else {
      this.objektForm.patchValue({openaccess: false});
    }
  }
}

