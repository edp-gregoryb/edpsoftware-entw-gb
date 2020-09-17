import { Component, OnInit, Input, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { appModules } from '../../const/appModules';
import { Router } from '@angular/router';

import { WindowrefService } from '../../comm/windowref.service';
import { words } from '../../../../../locale/words';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ WindowrefService ]
})

export class HomeComponent implements OnInit, AfterContentChecked {
  
  //@Input() licensedModules: string[];
  @Input() licensedModulestemp:any;
  @Input() currentUser: string;
  licensedModules:any = [];
  progressbar_visible: boolean;
  
  innerheight:number;
  
  constructor(private router:Router, private windowrefService:WindowrefService) {
  }
  
  ngOnInit() {
    for (let row of  this.licensedModulestemp){
      if (row.show){
        this.licensedModules.push(row);
      }
    }

    this.progressbar_visible      =   false;
    if (this.licensedModules.length == 1) {
      console.log('nur ein Modul lizenziert: ', this.licensedModules[0]);
      this.progressbar_visible = true;
      // this.licensedModules.find(x => {
      //   if (x.shorthand == this.licensedModules[0].shorthand) {
      //     console.log("true")
      //   } else {
      //     console.log("false")
      //   }
      //
      //
      // });
      // this.router.navigate([this.licensedModules[0].route]);//[this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route]);
      this.router.navigate([this.licensedModules.find(x => x.shorthand == this.licensedModules[0].shorthand).route]);
    }
  }


  
  @ViewChild('hoeheAusgleich', { static: false }) el:ElementRef;
  
  ngAfterContentChecked(){
    if(this.el){
      this.innerheight = self.innerHeight - this.el.nativeElement.offsetTop - 893;
    }
  }
  
  calcModuleWidth(){
    //returns true if all modules are in one line
    var len = this.licensedModules.length * 220;
    if(this.el.nativeElement.clientWidth < len){
      return false;
    }
    return true;
  }
  
  begruessung() {
    
    let datum = new Date();
    let stunde = datum.getHours();
    let begruessungsText: string = "";
    
    switch(stunde) { 
      case 21:
      case 22:
      case 23:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      { 
        return words.hello + this.currentUser + ", " + words.nightowl + " ;-)"; 
      }
      
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      { 
        return words.goodMorning + this.currentUser; 
      }
      
      case 10:
      case 11:
      { 
        return words.hello + this.currentUser; 
      }
      
      case 12:
      { 
        return words.goodNoon + this.currentUser; 
      }
      
      case 13:
      case 14:
      case 15:
      case 16:
      { 
        return words.goodAfternoon + this.currentUser; 
        
      }
       
      case 17:
      case 18:
      case 19:
      case 20:
      { 
        return words.goodEvening + this.currentUser; 
      }
        
      default: {
        return words.hi + this.currentUser; 
      } 
    } 
    
  }
  
  // edpModuleCardDetails(module: string) {
    
  //   // Detailinfos aus appModules.ts auslesen
  //   let moduleDetails: Object = appModules.find(x => x.shorthand == module);
    
  //   // Gefundene Detailangaben oder leeres Objekt zurückgeben
  //   if (moduleDetails) return moduleDetails;
  //   else return appModules.find(x => x.shorthand == "");
  
  // }

  edpModuleCardDetails(module: string) {
    
    // Detailinfos aus appModules.ts auslesen
    let moduleDetails: Object = this.licensedModules.find(x => x.shorthand == module);
    
    // Gefundene Detailangaben oder leeres Objekt zurückgeben
    if (moduleDetails) return moduleDetails;
    else return this.licensedModules.find(x => x.shorthand == "");
  
  }
  
  navigateModule(module: any) {

    // Detailinfos aus appModules.ts auslesen
    let moduleDetails: any = module;//.find(x => x.shorthand == module);
    console.log("module",module);
    //sessionStorage.setItem('lastmodule', module);
    // Gefundene Detailangaben oder leeres Objekt zurückgeben
    if (moduleDetails.route !=="") {
      console.log("Aufzurufende Route: " + moduleDetails.route);
      if (moduleDetails.route.toLowerCase().indexOf('offerte')>-1) {
        
        // Default-Data für Offert- und Auftragstool
        var data:any = {
          firma:2,
          beznr:19866,
          objekt:"hotel",
          rubrik:"",
          urubrik:"",
          termKontaktBeznr:19948,
          termmitbeznr:2488};
        this.progressbar_visible = true;
        this.router.navigate([moduleDetails.route,data]);
        
        console.log("Aufruf Offerte- & Auftragstool erfolgte mit folgenden Daten: ", data);
      }
      else {
        this.progressbar_visible = true;
        this.router.navigate([moduleDetails.route]);
      }
    }
    else console.log("Keine aufzurufende Route vorhanden!!!");
  }

  // navigateModule(module: string) {

  //   // Detailinfos aus appModules.ts auslesen
  //   let moduleDetails: any = appModules.find(x => x.shorthand == module);
  //   //sessionStorage.setItem('lastmodule', module);
  //   // Gefundene Detailangaben oder leeres Objekt zurückgeben
  //   if (moduleDetails.route !=="") {
  //     console.log("Aufzurufende Route: " + moduleDetails.route);
  //     if (moduleDetails.route.toLowerCase().indexOf('offerte')>-1) {
        
  //       // Default-Data für Offert- und Auftragstool
  //       var data:any = {
  //         firma:2,
  //         beznr:19866,
  //         objekt:"hotel",
  //         rubrik:"",
  //         urubrik:"",
  //         termKontaktBeznr:19948,
  //         termmitbeznr:2488};
  //       this.progressbar_visible = true;
  //       this.router.navigate([moduleDetails.route,data]);
        
  //       console.log("Aufruf Offerte- & Auftragstool erfolgte mit folgenden Daten: ", data);
  //     }
  //     else {
  //       this.progressbar_visible = true;
  //       this.router.navigate([moduleDetails.route]);
  //     }
  //   }
  //   else console.log("Keine aufzurufende Route vorhanden!!!");
  // }
  
}
