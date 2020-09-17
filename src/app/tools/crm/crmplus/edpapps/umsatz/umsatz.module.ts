import { UmsatzdetailComponent } from './umsatzdetail/umsatzdetail.component';
import { UmsatzRouterModule } from './umsatz.router';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginparameterService } from '../../../../shared/services/loginparameter.service';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { SharedModuleCrmplusModule } from '../../shared/shared-crmplus-module/shared-crmplus-module.module';
import { SharedToolsModuleModule } from '../../../../shared/module/shared-module-tools.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CdkTableModule } from '@angular/cdk/table';
import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { ObjektauswahlService } from '../../../../shared/services/objektauswahl.service';
import { AdrvermittlerService } from '../../../shared/services/adrvermittler.service';
import { UmsatzkundeService } from '../../shared/services/umsatzkunde.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UmsatzvertreterService } from '../../shared/services/umsatzvertreter.service';
import { UmsatzvermittlerService } from '../../shared/services/umsatzvermittler.service';
import { UmsatzobjektService } from '../../shared/services/umsatzobjekt.service';
import { UmsatzdynamischService } from '../../shared/services/umsatzdynamisch.service';
import { OsgruppennamenService } from '../../shared/services/osgruppennamen.service';
import { RestitosdynabfrageService } from '../../shared/services/restitosdynabfrage.service';
import { RestsygetdefaultService } from '../../shared/services/restsygetdefault.service';

import { RestitobjkeyabfrageService } from '../../shared/services/restitobjkeyabfrage.service';

import { UmsatzService } from '../../../shared/umsatz.service';
import { UmsatzkompComponent } from '../../shared/components/umsatzkomp/umsatzkomp.component';
import { RestitgebabfrageService } from '../../shared/services/restitgebabfrage.service';

import { UmsatzdynamischComponent } from '../../shared/components/umsatzdynamisch/umsatzdynamisch.component';
import { UmsatzchartComponent } from '../../shared/components/umsatzchart/umsatzchart.component';
import { UmsatztabelleComponent } from '../../shared/components/umsatztabelle/umsatztabelle.component';
import { PiechartComponent } from '../../shared/components/piechart/piechart.component';
import { FisextgetsichtService } from '../../../../shared//services/fisextgetsicht.service';
import { RestgetberechtstufenService } from '../../../../shared/services/restgetberechtstufen.service';
import { ChartsModule } from 'ng2-charts';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import {LoadingScreenService} from '../../../../shared/services/loading-screen.service';
import {LoadingScreenInterceptor} from '../../../../shared/components/loading-screen/loading.interceptor';
registerLocaleData(localeDECH);

@NgModule({
  declarations: [ UmsatzdetailComponent, UmsatzkompComponent, 
  UmsatzdynamischComponent, UmsatzchartComponent, UmsatztabelleComponent, PiechartComponent],
  imports: [
      UmsatzRouterModule,ChartsModule,
       HttpClientModule,CommonModule,ReactiveFormsModule,SharedModuleModule,FormsModule,SharedModuleCrmplusModule,
    RouterModule,FlexLayoutModule,SharedToolsModuleModule,
    MatInputModule, MatCardModule, MatListModule, MatIconModule, CdkTableModule,
    MatTableModule, MatToolbarModule, MatProgressBarModule, MatExpansionModule, MatDialogModule, MatAutocompleteModule, MatButtonModule, MatSlideToggleModule,
    MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSelectModule, NgxChartsModule,MatButtonToggleModule, MatSidenavModule
      ],
      entryComponents:[],
      providers: [
          AdrkundenService,
          LoginparameterService,
          AdrvermittlerService,
          ObjektauswahlService,
          UmsatzService,
          UmsatzkundeService, UmsatzvertreterService,
          UmsatzvermittlerService, UmsatzobjektService, UmsatzdynamischService,RestgetberechtstufenService,
          OsgruppennamenService, RestitosdynabfrageService, RestsygetdefaultService,RestitgebabfrageService,FisextgetsichtService,
          RestitobjkeyabfrageService,  LoadingScreenService, {provide: LOCALE_ID, useValue: "de-CH"},
          {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
          ]
})
export class UmsatzModule { 

 }