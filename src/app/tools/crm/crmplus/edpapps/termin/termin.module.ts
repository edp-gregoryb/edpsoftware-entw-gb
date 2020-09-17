
import { TerminRouterModule} from './termin.router';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';

import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { SharedModuleCrmplusModule } from '../../shared/shared-crmplus-module/shared-crmplus-module.module';
import { SharedToolsModuleModule } from '../../../../shared/module/shared-module-tools.module';
import { LoginparameterService } from '../../../../shared/services/loginparameter.service';

import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { UmsatzvertreterService } from '../../shared/services/umsatzvertreter.service';
import { UmsatzvermittlerService } from '../../shared/services/umsatzvermittler.service';
import { UmsatzobjektService } from '../../shared/services/umsatzobjekt.service';
import { ObjektauswahlService } from '../../../../shared/services/objektauswahl.service';
import { RubrikauswahlService } from '../../../../shared/services/rubrikauswahl.service';
import { AdrvermittlerService } from '../../../shared/services/adrvermittler.service';
import { RestitgebabfrageService } from '../../shared/services/restitgebabfrage.service';
import { RestitaufartabfrageService } from '../../shared/services/restitaufartabfrage.service';

import { TerminlistComponent } from './terminlist/terminlist.component';
 import { KundenterminlistComponent, KommentarShowDialog } from '../../shared/components/kundenterminlist/kundenterminlist.component';
import { KundentermindetailComponent } from '../../shared/components/kundentermindetail/kundentermindetail.component';

import { TerminService } from '../../../shared/termin.service';
import { FisextgetsichtService } from '../../../../shared//services/fisextgetsicht.service';
import { RestgetberechtstufenService } from '../../../../shared/services/restgetberechtstufen.service';
import { ReloginService } from '../../../../../shared/relogin.service';

import { MemonewService } from '../../../shared/services/memonew.service';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import { TermindetailComponent } from './termindetail/termindetail.component';
import { AschluesselauswahlService } from '../../../../shared/services/aschluesselauswahl.service';
import { SavetermindetailService } from '../../../shared/services/savetermindetail.service';
import { DelterminService } from '../../../shared/services/deltermin.service';
import { AuftragxlsxService } from '../../../shared/services/auftragxlsx.service';
import { TeleupdateService } from '../../../shared/services/teleupdate.service';
import { KontaktpersonService } from '../../../shared/services/kontaktperson.service';
import { AktivitaetService } from '../../../shared/services/aktivitaet.service';
import { MitarbeiterService } from '../../../shared/services/mitarbeiter.service';
import { TerminhistoryService } from '../../../shared/terminhistory.service';
import { KundenmemoService } from '../../../shared/services/kundenmemo.service';
import { DelkundenmemoService } from '../../../shared/services/delkundenmemo.service';
import { SavekundenmemoService } from '../../../shared/services/savekundenmemo.service';
import { MerkmalbasisService } from '../../../shared/services/merkmalbasis.service';
import { MerkmaladdService } from '../../../shared/services/merkmaladd.service';
import { MerkmaldeleteService } from '../../../shared/services/merkmaldelete.service';
import { TimelineService } from '../../../shared/timeline.service';
import { VerkaufschancenService } from '../../../shared/verkaufschancen.service';
import { FarosGetDateienService } from '../../../shared/faros-get-dateien.service';
import { GetofferteService } from '../../../shared/services/getofferte.service';
import { UnterrubrikauswahlService } from '../../../../shared/services/unterrubrikauswahl.service';
import { FisvlaboallService } from '../../../shared/services/fisvlaboall.service';
import { FisvlumluntrbrdispService } from '../../../shared/services/fisvlumluntrbrdisp.service';
import { AgenturkundeService } from '../../../shared/services/agenturkunde.service';
import { WindowsizeService} from '../../../../shared/services/windowsize.service';
import { RestitgetaktionService} from '../../../shared/services/restitgetaktion.service';
import { RestitgeterscheinungenService } from '../../../shared/services/restitgeterscheinungen.service';
import { TerminverschiebenService } from '../../../shared/services/terminverschieben.service';
import { CrmMailversandService } from '../../../../shared/services/restcrmmailversand.service';
import { CrmEmailidService } from '../../../../shared/services/restcrmemailid.service';
import {LoadingScreenService} from '../../../../shared/services/loading-screen.service';
import {LoadingScreenInterceptor} from '../../../../shared/components/loading-screen/loading.interceptor';
import {RestsygetdefaultService} from '../../shared/services/restsygetdefault.service';

registerLocaleData(localeDECH);

@NgModule({
  declarations: [TerminlistComponent, KundenterminlistComponent, KundentermindetailComponent, KommentarShowDialog, TermindetailComponent],
  imports: [
      TerminRouterModule,
       HttpClientModule,CommonModule,SharedModuleModule,SharedModuleCrmplusModule,MatCheckboxModule,MatMenuModule,
    RouterModule,FlexLayoutModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatSlideToggleModule, MatInputModule,
    MatCardModule, MatListModule, MatIconModule, MatTableModule, MatToolbarModule, MatProgressBarModule, MatExpansionModule,MatSidenavModule,MatButtonToggleModule,
    MatDialogModule, MatAutocompleteModule, MatButtonModule, ReactiveFormsModule ,FormsModule, CdkTableModule,MatPaginatorModule, MatSortModule, SharedToolsModuleModule

      ],
      entryComponents: [KommentarShowDialog],
      providers: [LoginparameterService, TerminService, FisextgetsichtService, RestgetberechtstufenService,ReloginService,AdrkundenService,
      UmsatzvertreterService, UmsatzvermittlerService, UmsatzobjektService, ObjektauswahlService, RubrikauswahlService, AdrvermittlerService,
      RestitgebabfrageService, RestitaufartabfrageService,MemonewService,AschluesselauswahlService,SavetermindetailService,DelterminService,
      AuftragxlsxService,TeleupdateService,KontaktpersonService,AktivitaetService,MitarbeiterService,TerminhistoryService,KundenmemoService,
      DelkundenmemoService,SavekundenmemoService,MerkmalbasisService,MerkmaladdService,MerkmaldeleteService,TimelineService,VerkaufschancenService,
      FarosGetDateienService,GetofferteService,UnterrubrikauswahlService, FisvlumluntrbrdispService,FisvlaboallService,AgenturkundeService,
      WindowsizeService, RestitgetaktionService, RestitgeterscheinungenService, TerminverschiebenService, CrmMailversandService, CrmEmailidService,
          LoadingScreenService, RestsygetdefaultService,
          {provide: LOCALE_ID, useValue: "de-CH"},
          {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
          
          ]
})
export class TerminModule { 

 }
  
