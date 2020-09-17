import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {NoPreloading, RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginparameterService } from '../shared/services/loginparameter.service';
import { DemoRouterModule } from './demo.router';

import { FisextgetsichtService } from '../shared//services/fisextgetsicht.service';
import { RestgetberechtstufenService } from '../shared/services/restgetberechtstufen.service';

import { DemoShowComponent } from './demo-show/demo-show.component';
import { SharedToolsModuleModule } from '../shared/module/shared-module-tools.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '../../core/core.module';
import {WfindexdbService} from '../other/shared/services/wfindexdb.service';


@NgModule({
  declarations: [DemoShowComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule, 
    MatMenuModule, MatInputModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatTooltipModule, MatButtonToggleModule,
    MatTableModule, MatToolbarModule, MatProgressBarModule, MatSidenavModule, MatCheckboxModule, MatGridListModule, MatFormFieldModule,
    DemoRouterModule, MatDialogModule, CoreModule,
    SharedToolsModuleModule
  ],
  entryComponents:[],
  providers: [
    LoginparameterService, FisextgetsichtService, RestgetberechtstufenService, WfindexdbService
    // , {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor,multi: true}
  ]
})

export class DemoModule { 

}
