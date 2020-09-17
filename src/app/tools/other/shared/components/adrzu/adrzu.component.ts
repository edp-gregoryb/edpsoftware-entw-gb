import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestGetadrzuService} from '../../rest-services/rest-getadrzu.service';
import {RestCreateadrzuService} from '../../rest-services/rest-createadrzu.service';
import {Adrzujson} from '../../entities/adrzujson';
import {RestUpdateadrzuService} from '../../rest-services/rest-updateadrzu.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-adrzu',
  templateUrl: './adrzu.component.html',
  styleUrls: ['./adrzu.component.css']
})
export class AdrzuComponent implements OnInit, OnChanges {

  @Input() zustandignummer;
  @Input() bbezner;
  @Output() abgleich = new EventEmitter();
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private getadrzuService: RestGetadrzuService, private restCreateadrzuService: RestCreateadrzuService,
              private updateadrzuService: RestUpdateadrzuService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.registerForm = this.fb.group({

      anrkey: [''],
      anrtext: [''],
      beznr: [''],
      beznrfirma: [''],
      email: ['', Validators.required],
      email2: [''],
      email3: [''],
      vname: ['', Validators.required ],
      fname: ['', Validators.required],
      gname: [''],
      gname2: [''],
      natel: [''],
      stat: [''],
      telge: ['', Validators.required],
      telgedi: [''],
      telpriv: [''],
      web: [''],
      abkname: [''],
    adrtitel: [''],
    adrtyp: [''],
    altenr: [''],
    anlass: [''],
    anrtitel: [''],
    anrtitel2: [''],
    bereich: [''],
    bundesland: [''],
    doublettespeichern: [''],
    fnamefirma: [''],
    ftitel: [''],
    gname2firma: [''],
    gnamefirma: [''],
    haupttelnr: [''],
    kfrei: [''],
    land: [''],
    nr: [''],
    ort: [''],
    pbundesland: [''],
    pland: [''],
    plz: [''],
    plzzu: [''],
    port: [''],
    postf: [''],
    pplz: [''],
    pplzzu: [''],
    sprache: [''],
    standort: [''],
    strasse: [''],
    telueber: [''],
    termid: [''],
    timestamp: [''],
    xdatum: [''],
    })
    if (this.zustandignummer) {
      this.preloadData(this.zustandignummer);
    }
  }

  get vname() {
    return this.registerForm.get('vname');
  }
  get fname() {
    return this.registerForm.get('fname');
  }
  get telge() {
    return this.registerForm.get('telge');
  }
  get email() {
    return this.registerForm.get('email');
  }

  ngOnChanges() {
   // console.log("this.bbezner", this.bbezner);
    if (this.bbezner) {
      this.neuerZustandiger(this.bbezner);
    }
  }

  preloadData(zustandNr) {
    this.getadrzuService.getAdrzu('', '', zustandNr)
        .subscribe(adrdetail => {
          this.registerForm.patchValue(adrdetail[0]);

         // console.log("adrdetail", adrdetail);
          // this.forminit(adrdetail[0]);

        });
  }


    neuerZustandiger(val) {
        this.restCreateadrzuService.postAdrzu(val)
            .subscribe(andrzu => {
             // console.log("andrzu",andrzu);
              this.registerForm.patchValue(andrzu[0]);
            })
    }

  updateZustandiger() {
    this.onSubmit();
   // console.log("this.registerForm.value", this.registerForm.value);


    this.updateadrzuService.putAdrzu(this.registerForm.value)
        .subscribe(update => {
          console.log("update", update);
          if (update.tt_adrzu[0].fehlercode !== '') {
            this.openSnackBar(update.tt_adrzu[0].fehlertext,'');
          } else {
            this.abgleich.next(update);
          }
        });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'
    });
  }

  onSubmit() {
    // console.log(this.registerForm.value);
  }
}

