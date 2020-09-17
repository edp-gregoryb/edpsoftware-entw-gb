import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RestVlgetobjtxtService} from '../../rest-services/rest-vlgetobjtxt.service';
import {RestVlupdtobjtxtService} from '../../rest-services/rest-vlupdtobjtxt.service';
import {WfindexdbService} from '../../services/wfindexdb.service';


export class Sprachenvorlage {
    autor: string;
    autortext: string;
    erscheinung: string;
    erscheinungtext: string;
    fehlercode: string;
    fehlertext: string;
    objekt: string;
    sprache: string;
    termid: string;
    text1: string;
    text2: string;
    zusatztext: string;
    zusatztext2: string;
}


@Component({
  selector: 'app-sprachentexte',
  templateUrl: './sprachentexte.component.html',
  styleUrls: ['./sprachentexte.component.css']
})
export class SprachentexteComponent implements OnInit {

    @Input() objekt: any;
    @Input() aschlussel: any;
    @Output() utitelupdate = new EventEmitter();
  sprachenForm: FormGroup;
  sprachen: Array<Sprachenvorlage> = [];

  tabs: Array<string> = [];


  constructor(private fb: FormBuilder, private getobjtxtService: RestVlgetobjtxtService,
              private vlupdtobjtxtService: RestVlupdtobjtxtService,
              private wfindexdbService: WfindexdbService) {

  }

  ngOnInit() {

      this.sprachenForm = this.fb.group({
          //sprachen: this.formBuilder.array([])
          sprachen: this.fb.array([])
      });
      this.preloadData();

  }



  addsprachen(fb: FormBuilder, spitem) {
      let sprachenForm =
      this.sprachenForm.controls['sprachen'] as FormArray;
      sprachenForm.push(fb.group({
          autor: [''],
          autortext: [''],
          erscheinung: [''],
          erscheinungtext: [''],
          fehlercode: [''],
          fehlertext: [''],
          objekt: [''],
          sprache: [''],
          termid: [''],
          text1: [''],
          text2: [''],
          zusatztext: [''],
          zusatztext2: [''],
      })
      )

  }

    preloadData() {
        this.getobjtxtService.getObjtxt(this.objekt)

            .subscribe(sprachdaten => {
                console.log("this.objekt", this.objekt);
                for (let item of sprachdaten) {
                    console.log(item);
                    this.tabs.push(item.sprache);
                    this.addsprachen(this.fb, item);

                }

                this.sprachenForm.patchValue({
                    'sprachen': sprachdaten
                })
            })
    }



  updateSprachenForm() {
    this.onSubmit();
      this.vlupdtobjtxtService.putVlObjtxt(this.sprachenForm.value)
          .subscribe(update => {
              // this.wfloadService.updateUntertitel();
              // this.preloadData();

              let tempsprachen = this.sprachenForm.value;
              console.log("tempsprachen.sprachen[0].text2", this.aschlussel, this.objekt, tempsprachen.sprachen[0].text2);

              this.wfindexdbService.updateUntertitel(this.aschlussel, this.objekt, tempsprachen.sprachen[0].text2);
              this.utitelupdate.emit('updateutitel');
              //this.preloadData();
              // this.wfindexdb.updateRenderTableUntertitel(this.aschlussel, this.objekt, tempsprachen.sprachen[0].text2)
             //  console.log('updateSprachenForm', this.aschlussel, this.objekt, update[0].text2);
              //this.wfloadService.updateRenderTableUntertitel(this.aschlussel, this.objekt, this.sprachenForm.controls.text2.value);
              //this.wfloadService.refreshProgress(this.objekt, this.aschlussel);
              console.log("vlupdtobjtxtService", update);
          })
    //console.log(this.sprachenForm.value);
  }

  onSubmit() {

  }
}
