import { CrmplusRouterModule} from './crmplus.router';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimelinedetailComponent } from './timelinedetail/timelinedetail.component';
// import { MatInputModule, MatCardModule, MatListModule, MatIconModule, MatToolbarModule, MatProgressBarModule, MatPaginatorModule, MatTableDataSource} from '@angular/material';
// import { CdkTableModule } from '@angular/cdk/table';
// import { MatTableModule } from '@angular/material/table';
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

import { AuftragdetailComponent } from '../../shared/components/auftragdetail/auftragdetail.component';
import { LoginparameterService } from '../../../../shared/services/loginparameter.service';
import { AuftragdetailService } from '../../../shared/services/auftragdetail.service';
import { FarosdateienService } from '../../../shared/services/farosdateien.service';
import { PosrekapService } from '../../../shared/services/posrekap.service';
import { FisFileDownloadService } from '../../../shared/services/fis-file-download.service';
//import { WindowrefService } from '../../../../shared/comm/windowref.service';
import { AuftragbestService } from '../../../shared/services/auftragbest.service';
import { FakturaService } from '../../../shared/services/faktura.service';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { TimelinelistComponent } from './timelinelist/timelinelist.component';
import { AuftraglistComponent } from '../../shared/components/auftraglist/auftraglist.component';
import { SharedModuleCrmplusModule } from '../../shared/shared-crmplus-module/shared-crmplus-module.module';
import { TimelineService } from '../../../shared/timeline.service';

import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { UmsatzvertreterService } from '../../shared/services/umsatzvertreter.service';
import { UmsatzvermittlerService } from '../../shared/services/umsatzvermittler.service';
import { UmsatzobjektService } from '../../shared/services/umsatzobjekt.service';
import { ObjektauswahlService } from '../../../../shared/services/objektauswahl.service';
import { RubrikauswahlService } from '../../../../shared/services/rubrikauswahl.service';
import { AdrvermittlerService } from '../../../shared/services/adrvermittler.service';
import { RestitgebabfrageService } from '../../shared/services/restitgebabfrage.service';
import { RestitaufartabfrageService } from '../../shared/services/restitaufartabfrage.service';
import { FarosgetinseratejpgService } from '../../shared/services/farosgetinseratejpg.service';
import { RestitauftragjpgService } from '../../shared/services/restitauftragjpg.service';
import { FisextgetsichtService } from '../../../../shared//services/fisextgetsicht.service';
import { RestgetberechtstufenService } from '../../../../shared/services/restgetberechtstufen.service';



//import { RubrikComponent } from '../../shared/components/rubrik/rubrik.component';
import { SafePipe } from '../../shared/pipes/safe.pipe';


import { SharedToolsModuleModule } from '../../../../shared/module/shared-module-tools.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import {LoadingScreenService} from '../../../../shared/services/loading-screen.service';
import {LoadingScreenInterceptor} from '../../../../shared/components/loading-screen/loading.interceptor';
registerLocaleData(localeDECH);

@NgModule({
  declarations: [TimelinedetailComponent, AuftragdetailComponent, TimelinelistComponent, AuftraglistComponent, SafePipe],
  imports: [
      CrmplusRouterModule,
       HttpClientModule,CommonModule,SharedModuleModule,SharedModuleCrmplusModule,MatCheckboxModule,
    RouterModule,FlexLayoutModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatSlideToggleModule, MatInputModule,
    MatCardModule, MatListModule, MatIconModule, MatTableModule, MatToolbarModule, MatProgressBarModule, MatExpansionModule,MatSidenavModule,MatButtonToggleModule,
    MatDialogModule, MatAutocompleteModule, MatButtonModule, ReactiveFormsModule ,FormsModule, CdkTableModule,MatPaginatorModule, MatSortModule, SharedToolsModuleModule
    // MatInputModule, MatCardModule, MatListModule, MatIconModule, CdkTableModule,
    // MatTableModule, MatToolbarModule, MatProgressBarModule, MatPaginatorModule
      ],
      entryComponents:[],
      providers: [
          AuftragdetailService, FarosdateienService, PosrekapService, FisFileDownloadService,  AuftragbestService, FakturaService,RestitauftragjpgService,
          LoginparameterService, TimelineService, AdrkundenService, UmsatzvertreterService, UmsatzvermittlerService, UmsatzobjektService, ObjektauswahlService,
          AdrvermittlerService, RubrikauswahlService, RestitgebabfrageService, RestitaufartabfrageService, FisextgetsichtService, RestgetberechtstufenService,
          FarosgetinseratejpgService,  LoadingScreenService, {provide: LOCALE_ID, useValue: "de-CH"},
          {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
          
          ]
})
export class CrmplusModule { 

 }
  