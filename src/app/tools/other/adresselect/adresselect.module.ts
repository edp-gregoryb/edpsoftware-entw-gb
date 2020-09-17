import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AdresselectRouterModule} from './adresselect.router';
import {AdresselectComponent} from './adresselect/adresselect.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
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
import { CdkTableModule } from '@angular/cdk/table';
import {SharedModuleModule} from '../../crm/shared/shared-module/shared-module.module';
import {SharedToolsModuleModule} from '../../shared/module/shared-module-tools.module';
import {AdrkundenService} from '../../shared/services/adrkunden.service';
import {LoginparameterService} from '../../shared/services/loginparameter.service';
import {ObjektauswahlService} from '../../shared/services/objektauswahl.service';
import {AschluesselauswahlService} from '../../shared/services/aschluesselauswahl.service';
import {MerkmalbasisService} from '../../crm/shared/services/merkmalbasis.service';
import {MerkmaleService} from '../../crm/shared/services/merkmale.service';
import {MerksucheComponent, MerksucheDialog} from '../shared/components/merksuche/merksuche.component';
import {ObjektmerksucheComponent, ObjektmerksuchedialogComponent} from '../shared/components/objektmerksuche/objektmerksuche.component';
import {SearchpanelMerkmaleComponent} from '../../crm/shared/dialogs/searchpanel-merkmale/searchpanel-merkmale.component';
import {RestStartadrselService} from '../shared/rest-services/rest-startadrsel.service';

@NgModule({
  imports: [
    CommonModule, RouterModule, AdresselectRouterModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule, FlexLayoutModule, MatProgressBarModule,
    SharedModuleModule, SharedToolsModuleModule, MatSidenavModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule,
    MatTableModule, MatCheckboxModule, CdkTableModule, MatPaginatorModule, MatListModule, MatDialogModule

  ],
  declarations: [AdresselectComponent, MerksucheComponent, ObjektmerksucheComponent, MerksucheDialog, ObjektmerksuchedialogComponent],
  entryComponents: [MerksucheDialog, ObjektmerksuchedialogComponent],
  providers: [AdrkundenService, LoginparameterService, ObjektauswahlService, AschluesselauswahlService, MerkmalbasisService,
    MerkmaleService, RestStartadrselService]
})
export class AdresselectModule { }
