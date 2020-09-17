import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FisvlaboallService } from '../../services/fisvlaboall.service';
import { FisvlumluntrbrdispService } from '../../services/fisvlumluntrbrdisp.service';
import { WindowsizeService} from '../../../../shared/services/windowsize.service';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { GetaboinfoService } from '../../../../other/shared/rest-services/getaboinfo.service';

@Component({
  selector: 'app-infosabo',
  templateUrl: './infosabo.component.html',
  styleUrls: ['./infosabo.component.css']
})
export class InfosaboComponent implements OnInit {

  abodaten:any = [];
  //abodatenjson:aboentity;
  @Input() kundennummer: any;
  innerheight:number;
  showProgressBar:boolean = false;
  private resizeSubscription:Subscription;

  constructor(private fisvlaboallService:FisvlaboallService,
              private fisvlumluntrbrdispService:FisvlumluntrbrdispService,
              private windowsizeService:WindowsizeService,
              private router: Router,
              private getaboinfoService:GetaboinfoService) { 
    this.innerheight = self.innerHeight - 60 - 53;
  }

  ngOnChanges(){
    this.resizeSubscription =  this.windowsizeService.onResize$
      .subscribe(size => {
        console.log("windowsize", size.innerHeight);
        this.innerheight = size.innerHeight - 60 - 53;
    });

    if (this.kundennummer){
      this.showProgressBar = true;
      this.abodaten = [];

      this.getaboinfoService.getAboInfo(this.kundennummer)
        .subscribe(ret => {
          this.abodaten = ret;

          if(!this.abodaten){
            this.abodaten = [];
          }
          this.showProgressBar = false;
      });

      /*this.fisvlaboallService.getAllabo(this.kundennummer)
        .subscribe(abos => {
          console.log("abos",abos);
  
          var message_expression5 = /\\u0005/g;
          var message_expression6 = /\\u0006/g;
          var message_expressiona = /\\u000a/g;
          var message_expressiondatum = /\W/gm;
          for (let row of abos){
            //console.log("row",row);
            if (row.messageResponse.startsWith("adressnr")){
              let tempdata5 = row.messageResponse.replace(message_expression5,',');
              let tempdata6 = tempdata5.replace(message_expression6,',');
              let tempdataa = tempdata6.replace(message_expressiona,'');
              
              //let temparray= tempdataa.split(',');
              //let tempstr = JSON.stringify(tempdataa);
              //let tempjson = JSON.parse(tempstr);
              let temparray1 = tempdataa.split(',');
              let zv = temparray1[13].replace(message_expressiondatum,'.');
              let zb = temparray1[15].replace(message_expressiondatum,'.');
              let nf = temparray1[17].replace(message_expressiondatum,'.');
              console.log(temparray1);
              this.abodatenjson = {
                "adressnr" : temparray1[1],
              "vorgangsnr" : temparray1[3],
              "posnr" : temparray1[5],
              "artikel" : temparray1[7],
              "artikelbez" : temparray1[9],
              "artikelbez2" : temparray1[11],
              "zustellvon" : zv,
              "zustellbis" : zb,
              "naechstefaktura" : nf,
              "menge" : temparray1[19],
              "gesperrt" : temparray1[21],
              "sprache" : temparray1[23],
              "umlunt" : temparray1[25],
              "logins" : temparray1[27]
              }
  
              this.abodaten.push(this.abodatenjson);
              
            } else {
              this.abodaten = [];
            }
  
          }
          console.log("abo rows",this.abodaten);
  
          for(let row of this.abodaten){
  
          }
          this.showProgressBar = false;
        });*/
      } else {
        this.abodaten = [];
      }
  }
  ngOnInit() {

    this.fisvlumluntrbrdispService.getUmleitungabo('','')
      .subscribe(uml => {
        console.log("uml", uml);
      });
      console.log("this.kundennummer",this.kundennummer);
    
  }

  goToAbo(adressnr, vorgangsnr, posnr) {
    sessionStorage.setItem('aboAdressnr', this.kundennummer);
    sessionStorage.setItem('aboVorgangsnr', vorgangsnr);
    sessionStorage.setItem('aboPosnr', posnr);

    this.router.navigate(['./abodetailview/abodetail-show']);
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

}

/*interface aboentity {
  adressnr:any;
  vorgangsnr:string;
  posnr:string;
  artikel:string;
  artikelbez:string;
  artikelbez2:string;
  zustellvon:string;
  zustellbis:string;
  naechstefaktura:string;
  menge:string;
  gesperrt:string;
  sprache:string;
  umlunt:string;
  logins:string;
}*/
