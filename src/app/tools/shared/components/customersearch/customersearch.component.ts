import { Component, OnInit, ViewContainerRef, Output,EventEmitter, Input } from '@angular/core';
import { AdrkundenService } from '../../../shared/services/adrkunden.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-customersearch',
    templateUrl: './customersearch.component.html',
    styleUrls: ['./customersearch.component.css']
  })
  
  
  export class CustomersearchComponent implements OnInit {

    kunden:any;
    formctrl = new FormControl();
    @Output() custsearch = new EventEmitter();
    @Output() loading = new EventEmitter<boolean>(); //ob die kundensuche am laufen ist
    spaceinput: boolean = false;
    vonlink: string;
    size = 14;
    constructor(private adrkundenService:AdrkundenService, private route: ActivatedRoute, private router: Router){}
    ngOnInit() {
        this.route.params.subscribe(params => {
          console.log("params", params);

          this.vonlink = JSON.parse(params.beznr)
          if (this.vonlink) {
            this.Kunden(this.vonlink);
          }
         // console.log("params", this.vonlink);
         // this.router.navigate(['./kundensucheview/kundensuche-show', {}]);

        });

    }

    public Kunden(event):void {
      console.log("event",event);
      if(this.spaceinput || this.vonlink){
        this.adrkundenService.getKunde(event, 'yes', 'yes')
          .subscribe((kunden)=> {
        
            this.kunden = kunden;
            this.custsearch.next(this.kunden);
            //console.log("this.kunden",this.kunden);
            this.spaceinput = false;
            this.loading.emit(false);
          },
          (err) => {
            console.warn(err);
          }
        );
      }
    }

    public spacetrue(val){
      this.spaceinput = val.isTrusted;
    }
    public entertrue(val){
      //console.log("entertrue",val);
      //console.log("this.formctrl.value",this.formctrl.value);
      if (this.formctrl.value){
        this.spaceinput = true;
        this.loading.emit(true);
        this.Kunden(this.formctrl.value);
        
      }
      
    }

    public clicktrue(val){
      //console.log("clicktrue",val);
      //console.log("this.formctrl.value",this.formctrl.value);
      if (this.formctrl.value){
        this.spaceinput = true;
        this.loading.emit(true);
        this.Kunden(this.formctrl.value);
      }
    }
  }
