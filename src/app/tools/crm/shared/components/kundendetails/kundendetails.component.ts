import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentIndex} from 'ndx';
import {RestcreateadrhauptService} from '../../services/restcreateadrhaupt.service';


@Component({
    selector: 'app-kundendetails',
    templateUrl: './kundendetails.component.html',
    styleUrls: ['./kundendetails.component.css']
  })
  export class KundendetailsComponent implements OnInit, AfterViewInit, OnChanges {

    @Input()kunden: any;  
    @Output() kundeninfo = new EventEmitter(); 
    @Output() click = new EventEmitter();
    @Output() beznrvonEdit = new EventEmitter();
    isAngezeigt:boolean = false; 
    klicktindex:number = 0;
    val0: any;
    temphistoryliste: any;
    minInnerHeight: number = 0;
    addKundeicon: boolean= false;

    @ViewChild('scrollItems', { read: ElementRef, static: false }) public scrollItems: ElementRef<any>;

    constructor(private router: Router, private route: ActivatedRoute, private createadrhauptService: RestcreateadrhauptService) {
        let addberechtstring = sessionStorage.getItem('detberecht');
        if (addberechtstring) {
            let addberchtjson = JSON.parse(addberechtstring);
            // console.log('addberecht', addberchtjson.length);
            for (let i = 0; i < addberchtjson.length; i++) {
                // console.log('addberecht', addberchtjson[i].funkt);
                if (addberchtjson[i].funkt === 'ADCO') {
                    console.log('addberecht', addberchtjson[i].detberecht);
                    if (addberchtjson[i].detberecht[0] === 'J') {
                        this.addKundeicon = true;
                        // console.log('this.addKundeicon JA', this.addKundeicon);
                    } else {
                        this.addKundeicon = false;
                        // console.log('this.addKundeicon Nein', this.addKundeicon);
                    }
                }

            }
        } else {
            console.log("Kein detberecht eintrag Add button auf false");
        }

    }
  
    ngAfterViewInit(){
      if(sessionStorage.getItem('ADCOscroll')){
        document.getElementById('scroll').scrollTop = Number(sessionStorage.getItem('ADCOscroll'));
      }
    }

    ngOnChanges() {

        sessionStorage.setItem('kundenArray', JSON.stringify(this.kunden));
        console.log("this.kunden", this.kunden);

        if (this.router.url.indexOf(';beznr') > -1) {
            this.showdetails(null, 'onSubmit', this.kunden[0], 0);

        }
    }
    
    ngOnInit(){
      let klick = sessionStorage.getItem('ADCOklicktindex');
      if (klick && this.kunden.length > klick){
        this.openselected(this.kunden, klick);
        this.showdetails(null, 'onSubmit', this.kunden[klick], klick);
      }
      //
      //   this.route.params.subscribe(params => {
      //       let tempjson = JSON.parse(params.beznr)
      //       console.log("params", tempjson);
      //
      //   });

    }
    
    public showdetails(event:Event,button:string,val,index){
        if(event){
          event.stopPropagation();
        }
        
        console.log("showdetails",val);
        this.kunden.map((navItem) => {
          navItem.isAngezeigt = navItem === val;
        });

        this.click.next(button);
        if (button === "onSubmit"){
          console.log("onSubmit",index);
          this.klicktindex = index;
          sessionStorage.setItem('ADCOklicktindex', index);
          if(document.getElementById('scroll') !== null){
            sessionStorage.setItem('ADCOscroll', (document.getElementById('scroll').scrollTop).toString());
          }
        }
         this.isAngezeigt = true;
         this.kundeninfo.next(val);
        
    }

    openselected(terminlist,index){
     // console.log("openselected", terminlist);
     if (terminlist){
      if (terminlist.length !== 0){
        var termine = terminlist[index];
        terminlist[index].isAngezeigt =true;
      }
    }
  }

    addKunde() {
        this.createadrhauptService.createHauptadresse()
            .subscribe(adrntemplate => {
                console.log('adrntemplate', adrntemplate[0])
                this.router.navigate(['./kundensucheview/neuerkunde-show', {template: JSON.stringify(adrntemplate[0])}]);
            });
    }

    searchItems(event) {

        if (! this.kunden) {
            return;
        }
        if (!event) {

            let kundenA = sessionStorage.getItem('kundenArray');
            console.log('leer', kundenA)
            setTimeout(() => {
                this.kunden = JSON.parse(kundenA);
                console.log('this.tempkundenarray', this.kunden)
                let klick = sessionStorage.getItem('ADCOklicktindex');
                this.openselected(this.kunden, klick);
                // this.minInnerHeight = Number(sessionStorage.getItem('ADCOscroll'));
                // console.log('this.minInnerHeight', this.minInnerHeight)
                // this.scrollItems.nativeElement.scrollTop = this.minInnerHeight;
                setTimeout(() => {
                this.goBack();
                }, 500);
            }, 500);


        }
        this.temphistoryliste = this.kunden;
        const index = new DocumentIndex();
        // index.addField("aufnr");
        index.addField("bfname");
        index.addField("vname");
        index.addField("fname");
        index.addField("bstrasse");
        index.addField("bort");
        index.addField("btelge");
        index.addField("groesse");
        // index.addField("aufnr");
        this.temphistoryliste.forEach((doc) => {
            index.add(doc, doc);
        });
        var obj = index.search(event);
        // console.log("index",obj);

        var tempjsonArray = [];
        for (var i = 0; i <= obj.length - 1; i++) {
            tempjsonArray.push(obj[i].docId);
        }
        this.kunden = tempjsonArray;
        this.scrollItems.nativeElement.scrollTop = 0;
    }

    goBack() {
        if (this.router.url === '/kundensucheview/kundensuche-show') {
            this.minInnerHeight = Number(sessionStorage.getItem('ADCOscroll'));
            console.log('this.minInnerHeight', this.minInnerHeight)
            this.scrollItems.nativeElement.scrollTop = this.minInnerHeight;

        }
    }
}
