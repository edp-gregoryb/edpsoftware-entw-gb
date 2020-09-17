import { CockpitRouterModule} from './cockpit.router';
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

import { CockpitComponent } from './cockpit/cockpit.component';
import { TerminService } from '../../../shared/termin.service';
import { TimelineService } from '../../../shared/timeline.service';
import { RestitaufeinwocheService }  from '../../shared/services/restitaufeinwoche.service';
import { RestitaufeinmonatService } from '../../shared/services/restitaufeinmonat.service';
import { RestitaufeinytodateService } from '../../shared/services/restitaufeinytodate.service';
import { UmsatzService } from '../../../shared/umsatz.service';
import { VerkaufschancenService } from '../../../shared/verkaufschancen.service';
import { FisextgetsichtService } from '../../../../shared//services/fisextgetsicht.service';
import { RestgetberechtstufenService } from '../../../../shared/services/restgetberechtstufen.service';

import { ReloginService } from '../../../../../shared/relogin.service';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import {LoadingScreenInterceptor} from '../../../../shared/components/loading-screen/loading.interceptor';
import {LoadingScreenService} from '../../../../shared/services/loading-screen.service';
registerLocaleData(localeDECH);

@NgModule({
  declarations: [CockpitComponent],
  imports: [
      CockpitRouterModule,
       HttpClientModule,CommonModule,SharedModuleModule,SharedModuleCrmplusModule,MatCheckboxModule,MatMenuModule,
    RouterModule,FlexLayoutModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatSlideToggleModule, MatInputModule,
    MatCardModule, MatListModule, MatIconModule, MatTableModule, MatToolbarModule, MatProgressBarModule, MatExpansionModule,MatSidenavModule,MatButtonToggleModule,
    MatDialogModule, MatAutocompleteModule, MatButtonModule, ReactiveFormsModule ,FormsModule, CdkTableModule,MatPaginatorModule, MatSortModule, SharedToolsModuleModule

      ],
      entryComponents:[],
      providers: [LoginparameterService, TerminService, FisextgetsichtService, RestgetberechtstufenService,VerkaufschancenService,TimelineService,
      RestitaufeinwocheService,RestitaufeinmonatService,RestitaufeinytodateService, UmsatzService, ReloginService, LoadingScreenService,
           {provide: LOCALE_ID, useValue: "de-CH"},
          {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
          
          ]
})
export class CockpitModule { 

 }
  
