import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdressverwaltungShowComponent } from './adressverwaltung-show/adressverwaltung-show.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModuleModule} from '../../crm/shared/shared-module/shared-module.module';
import {SharedToolsModuleModule} from '../../shared/module/shared-module-tools.module';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdressverwaltungRouterModule} from './adressverwaltung.router';
import {RestGetadrzuService} from '../shared/rest-services/rest-getadrzu.service';

import {AdrkundenService} from '../../shared/services/adrkunden.service';
import {LoginparameterService} from '../../shared/services/loginparameter.service';
import {ObjektauswahlService} from '../../shared/services/objektauswahl.service';
import {AschluesselauswahlService} from '../../shared/services/aschluesselauswahl.service';
import {RestCreateadrzuService} from '../shared/rest-services/rest-createadrzu.service';

@NgModule({
  imports: [
    RouterModule, AdressverwaltungRouterModule, CommonModule, FlexLayoutModule, MatProgressBarModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    SharedModuleModule, SharedToolsModuleModule, MatSidenavModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule,
    MatTableModule, MatCheckboxModule, CdkTableModule, MatPaginatorModule, MatListModule, MatDialogModule, ReactiveFormsModule
  ],
  declarations: [ AdressverwaltungShowComponent
     ],
  entryComponents: [],
  providers: [RestGetadrzuService, AdrkundenService, LoginparameterService, ObjektauswahlService, AschluesselauswahlService,
    RestCreateadrzuService]
})
export class AdressverwaltungModule { }
