import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodenComponent } from './coden/coden.component';
import {CodenRouterModule} from './coden.router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModuleModule} from '../../crm/shared/shared-module/shared-module.module';
import {SharedToolsModuleModule} from '../../shared/module/shared-module-tools.module';
import {CdkTableModule} from '@angular/cdk/table';
import {AdrkundenService} from '../../shared/services/adrkunden.service';
import {LoginparameterService} from '../../shared/services/loginparameter.service';
import {ObjektauswahlService} from '../../shared/services/objektauswahl.service';
import {AschluesselauswahlService} from '../../shared/services/aschluesselauswahl.service';
import {RestGetcodeService} from '../shared/rest-services/rest-getcode.service';
//import {CodeartDialog, CodensucheComponent} from '../shared/components/codensuche/codensuche.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RestUpdatecodeService} from '../shared/rest-services/rest-updatecode.service';
import {RestDeletecodeService} from '../shared/rest-services/rest-deletecode.service';

@NgModule({
  imports: [
    CommonModule, CodenRouterModule, FlexLayoutModule, MatProgressBarModule,
    SharedModuleModule, SharedToolsModuleModule, MatSidenavModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule,
    MatTableModule, MatCheckboxModule, CdkTableModule, MatPaginatorModule, MatListModule, MatProgressBarModule,
    SharedModuleModule, SharedToolsModuleModule, MatSidenavModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule,
    MatTableModule, MatCheckboxModule, CdkTableModule, MatPaginatorModule, MatListModule, MatDialogModule, FormsModule , ReactiveFormsModule
  ],
  declarations: [CodenComponent/*, CodensucheComponent, CodeartDialog*/],
  entryComponents:  [/*CodeartDialog*/],
  providers: [AdrkundenService, LoginparameterService, ObjektauswahlService, AschluesselauswahlService, RestGetcodeService,
    RestUpdatecodeService, RestDeletecodeService]
})
export class CodenModule { }
