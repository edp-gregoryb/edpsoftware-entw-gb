import { KundenRouterModule } from './kunden.router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';

import { KundenShowComponent } from './kunden-show/kunden-show.component';

import { TerminService } from '../../shared/termin.service';

import { TerminhistoryService } from '../../shared/terminhistory.service';
import { TimelineService } from '../../shared/timeline.service';
import { VerkaufschancenService } from '../../shared/verkaufschancen.service';
import { FarosGetDateienService } from '../../shared/faros-get-dateien.service';
import { AktivitaetService } from '../../shared/services/aktivitaet.service';
import { MainsearchService } from '../../shared/comm/mainsearch.service';
import { KontaktpersonService } from '../../shared/services/kontaktperson.service';
import { TerminverschiebenService } from '../../shared/services/terminverschieben.service';

import { MerkmalbasisService } from '../../shared/services/merkmalbasis.service';
import { MerkmaladdService } from '../../shared/services/merkmaladd.service';
import { MerkmaldeleteService } from '../../shared/services/merkmaldelete.service';
import { AuftragxlsxService } from '../../shared/services/auftragxlsx.service';
import { UnterrubrikauswahlService } from '../../../shared/services/unterrubrikauswahl.service';
import { DelkundenmemoService } from '../../shared/services/delkundenmemo.service';
import { KundenmemoService } from '../../shared/services/kundenmemo.service';
import { SavekundenmemoService } from '../../shared/services/savekundenmemo.service';
import { ObjektauswahlService } from '../../../shared/services/objektauswahl.service';
import { RubrikauswahlService } from '../../../shared/services/rubrikauswahl.service';
import { SavetermindetailService } from '../../shared/services/savetermindetail.service';
import { TeleupdateService } from '../../shared/services/teleupdate.service';
import { MitarbeiterService } from '../../shared/services/mitarbeiter.service';
import { DelterminService } from '../../shared/services/deltermin.service';
import { AgenturkundeService } from '../../shared/services/agenturkunde.service';
import { AdrvermittlerService } from '../../shared/services/adrvermittler.service';
import { AdrkundenService } from '../../../shared/services/adrkunden.service';
import { AschluesselauswahlService } from '../../../shared/services/aschluesselauswahl.service';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { GetofferteService } from '../../shared/services/getofferte.service';
import { AuftragdetailService } from '../../shared/services/auftragdetail.service';
import { AuftragbestService } from '../../shared/services/auftragbest.service';
import { FakturaService } from '../../shared/services/faktura.service';
import { SharedToolsModuleModule } from '../../../shared/module/shared-module-tools.module';
import { FarosgetinseratejpgService } from '../../crmplus/shared/services/farosgetinseratejpg.service';
import { FisvlaboallService } from '../../shared/services/fisvlaboall.service';
import { FisvlumluntrbrdispService } from '../../shared/services/fisvlumluntrbrdisp.service';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WindowsizeService} from '../../../shared/services/windowsize.service';
import { RestitgetaktionService } from '../../shared/services/restitgetaktion.service';
import { RestitgeterscheinungenService } from '../../shared/services/restitgeterscheinungen.service';
import { KundenkarteformService } from '../../shared/services/kundenkarteform.service';
import { KundenkarteService } from '../../shared/services/kundenkarte.service';
import { UploadDateiService } from '../../shared/services/uploaddatei.service';
import { WindowrefService } from '../../../shared/comm/windowref.service';
import { CrmMailversandService } from '../../../shared/services/restcrmmailversand.service';
import { CrmEmailidService } from '../../../shared/services/restcrmemailid.service';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
registerLocaleData(localeDECH);
import { RestsygetdefaultService } from '../../crmplus/shared/services/restsygetdefault.service';
import { RestitdownloaddateiService } from '../../shared/services/restitdownloaddatei.service';
import { RestitgetdateienService } from '../../shared/services/restitgetdateien.service';
import {RestCrystalGetPdfService} from '../../shared/services/rest-crystal-get-pdf.service';
import {LoadingScreenInterceptor} from '../../../shared/components/loading-screen/loading.interceptor';
import {LoadingScreenService} from '../../../shared/services/loading-screen.service';
import {RestCreateadrzuService} from '../../../other/shared/rest-services/rest-createadrzu.service';
import {RestDeleteadrzuService} from '../../../other/shared/rest-services/rest-deleteadrzu.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RestitauftraggesamtService} from '../../shared/services/restitauftraggesamt.service';

@NgModule({
  declarations: [
   KundenShowComponent
  ],
   imports: [
    KundenRouterModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,CommonModule,
    RouterModule,FlexLayoutModule,
    
    SharedModuleModule,SharedToolsModuleModule,MatSidenavModule,MatIconModule,MatButtonModule, MatSnackBarModule
    
   ],
    providers: [
       
       TerminService,TerminhistoryService,MainsearchService,
  TimelineService, VerkaufschancenService,FarosGetDateienService,AktivitaetService,
  KontaktpersonService,TerminverschiebenService,
  ObjektauswahlService,RubrikauswahlService,DelkundenmemoService,KundenmemoService,
  SavekundenmemoService,SavetermindetailService,FisvlumluntrbrdispService,
  UnterrubrikauswahlService,TeleupdateService,MitarbeiterService,MerkmalbasisService,MerkmaladdService,MerkmaldeleteService,
  DelterminService,AgenturkundeService,AdrvermittlerService,AdrkundenService,LoginparameterService,
  AschluesselauswahlService,GetofferteService,AuftragxlsxService,AuftragdetailService,AuftragbestService,FakturaService, FarosgetinseratejpgService,
  FisvlaboallService,WindowsizeService,RestitgetaktionService, RestitgeterscheinungenService,KundenkarteformService,KundenkarteService,UploadDateiService,WindowrefService,
  CrmMailversandService, CrmEmailidService, RestsygetdefaultService, RestitdownloaddateiService, RestCrystalGetPdfService, LoadingScreenService, RestCreateadrzuService,
        RestDeleteadrzuService,RestitauftraggesamtService,
        RestitgetdateienService,  {provide: LOCALE_ID, useValue: "de-CH"}
        ,
        {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
    ]
    })
export class KundenModule { 

 }
