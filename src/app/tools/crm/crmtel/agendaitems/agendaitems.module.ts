import { AgendaitemsRouterModule } from './agendaitems.router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
registerLocaleData(localeDECH);
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { AgendaitemsShowComponent } from './agendaitems-show/agendaitems-show.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProcommonService } from '../../shared/comm/procommon.service';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { AdrkundenService } from '../../../shared/services/adrkunden.service';
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
import { AschluesselauswahlService } from '../../../shared/services/aschluesselauswahl.service';
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
import { AuftragxlsxService } from '../../shared/services/auftragxlsx.service';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { GetofferteService } from '../../shared/services/getofferte.service';
import { AuftragdetailService } from '../../shared/services/auftragdetail.service';
import { AuftragbestService } from '../../shared/services/auftragbest.service';
import { FakturaService } from '../../shared/services/faktura.service';
import { FisvlaboallService } from '../../shared/services/fisvlaboall.service';
import { FisvlumluntrbrdispService } from '../../shared/services/fisvlumluntrbrdisp.service';
import { SharedToolsModuleModule } from '../../../shared/module/shared-module-tools.module';
import { FarosgetinseratejpgService } from '../../crmplus/shared/services/farosgetinseratejpg.service';

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
import { RestsygetdefaultService } from '../../crmplus/shared/services/restsygetdefault.service';
import { RestitdownloaddateiService } from '../../shared/services/restitdownloaddatei.service';
import { RestitgetdateienService } from '../../shared/services/restitgetdateien.service';
import {RestCrystalGetPdfService} from '../../shared/services/rest-crystal-get-pdf.service';
import {LoadingScreenInterceptor} from '../../../shared/components/loading-screen/loading.interceptor';
import {LoadingScreenService} from '../../../shared/services/loading-screen.service';
import {RestCreateadrzuService} from '../../../other/shared/rest-services/rest-createadrzu.service';
import {RestDeleteadrzuService} from '../../../other/shared/rest-services/rest-deleteadrzu.service';
import {MatChipsModule} from '@angular/material/chips';
import {RestinsdeleteofferteService} from '../../shared/services/restinsdeleteofferte.service';
import {DeleteOfferteDialog} from '../../shared/components/infosofferten/infosofferten.component';
import {CodenDialog} from '../../shared/components/update-neuer-kunde/update-neuer-kunde.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {RestitauftraggesamtService} from '../../shared/services/restitauftraggesamt.service';
@NgModule({
  declarations: [
   AgendaitemsShowComponent
  ],
   imports: [
    AgendaitemsRouterModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule, CommonModule,
    RouterModule, FlexLayoutModule, MatProgressBarModule,
    SharedModuleModule, SharedToolsModuleModule,MatSidenavModule,MatIconModule,MatButtonModule, MatChipsModule, MatSnackBarModule,
       DragDropModule
    
    
   ],
    entryComponents: [],
    providers: [
       ProcommonService,
       TerminService,TerminhistoryService,MainsearchService,
  TimelineService, VerkaufschancenService,FarosGetDateienService,AktivitaetService,
  KontaktpersonService,TerminverschiebenService,
  ObjektauswahlService,RubrikauswahlService,DelkundenmemoService,KundenmemoService,
  SavekundenmemoService,SavetermindetailService, FisvlumluntrbrdispService,
  UnterrubrikauswahlService,TeleupdateService,MitarbeiterService,MerkmalbasisService,MerkmaladdService,MerkmaldeleteService,
  DelterminService,AgenturkundeService,AdrvermittlerService,AuftragxlsxService,AdrkundenService,LoginparameterService,
  AschluesselauswahlService,GetofferteService,AuftragdetailService,AuftragbestService,FakturaService, FarosgetinseratejpgService,
  FisvlaboallService,WindowsizeService,RestitgetaktionService,RestitgeterscheinungenService,KundenkarteformService,KundenkarteService,UploadDateiService,
  WindowrefService, CrmMailversandService, CrmEmailidService, RestsygetdefaultService, RestCrystalGetPdfService, LoadingScreenService, RestCreateadrzuService,
        RestDeleteadrzuService, RestinsdeleteofferteService,RestitauftraggesamtService,
        RestitdownloaddateiService, RestitgetdateienService, {provide: LOCALE_ID, useValue: 'de-CH'}
        ,
        {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
    ]
    })
export class AgendaitemsModule { 

 }
