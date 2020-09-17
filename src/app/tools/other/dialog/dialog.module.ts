import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import {DialogRouterModule} from './dialog.router';
import {FlexLayoutModule} from '@angular/flex-layout';
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
import {SharedModuleModule} from '../../crm/shared/shared-module/shared-module.module';
import {SharedToolsModuleModule} from '../../shared/module/shared-module-tools.module';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdrkundenService} from '../../shared/services/adrkunden.service';
import {LoginparameterService} from '../../shared/services/loginparameter.service';
import {ObjektauswahlService} from '../../shared/services/objektauswahl.service';
import {AschluesselauswahlService} from '../../shared/services/aschluesselauswahl.service';
import {KodiComponent} from '../shared/components/kodi/kodi.component';
import {KovlComponent} from '../shared/components/kovl/kovl.component';
import {KonvvorlGetService} from '../shared/json-services/konvvorl-get.service';

@NgModule({
    imports: [
        CommonModule, DialogRouterModule, FlexLayoutModule, MatProgressBarModule,
        SharedModuleModule, SharedToolsModuleModule, MatSidenavModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule,
        MatTableModule, MatCheckboxModule, CdkTableModule, MatPaginatorModule, MatListModule, MatProgressBarModule,
        SharedModuleModule, SharedToolsModuleModule, MatSidenavModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule,
        MatTableModule, MatCheckboxModule, CdkTableModule, MatPaginatorModule, MatListModule, MatDialogModule, FormsModule , ReactiveFormsModule
    ],
    declarations: [ DialogComponent, KodiComponent, KovlComponent ],
    entryComponents:  [],
    providers: [AdrkundenService, LoginparameterService, ObjektauswahlService, AschluesselauswahlService, KonvvorlGetService]
})
export class DialogModule { }
