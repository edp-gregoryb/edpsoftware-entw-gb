//Modules
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboRouterModule } from './abo.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkTableModule } from '@angular/cdk/table';
import { SharedModuleModule } from '../../crm/shared/shared-module/shared-module.module';
import { SharedToolsModuleModule } from '../../shared/module/shared-module-tools.module';
//Services
import { AdrkundenService } from '../../shared/services/adrkunden.service';
import { ObjektauswahlService } from '../../shared/services/objektauswahl.service';
import { AschluesselauswahlService } from '../../shared/services/aschluesselauswahl.service';
import { LoginparameterService} from '../../shared/services/loginparameter.service';
//Components
import { AboComponent } from './abo/abo.component';
import { AbolistComponent } from '../shared/components/abolist/abolist.component';
import { AbodetailComponent } from '../shared/components/abodetail/abodetail.component';
import { AbokategorienComponent } from '../shared/components/abodetailcomponents/abokategorien/abokategorien.component';
import { AbotermineComponent } from '../shared/components/abodetailcomponents/abotermine/abotermine.component';
import { AboumleitungenComponent } from '../shared/components/abodetailcomponents/aboumleitungen/aboumleitungen.component';
import { AboverwaltungComponent } from '../shared/components/abodetailcomponents/aboverwaltung/aboverwaltung.component';
//Dialogs
import { DetailinfoDialog } from '../shared/components/abodetail/abodetail.component';
import { AboloeschenDialog } from '../shared/components/abodetail/abodetail.component';
import { AbopreisDialog } from '../shared/components/abodetailcomponents/aboverwaltung/aboverwaltung.component';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter'; //MAT_MOMENT_DATE_ADAPTER_OPTIONS
import { environment } from '../../../../environments/environment';
import localeDECH from '@angular/common/locales/de-CH';
registerLocaleData(localeDECH);

@NgModule({
  imports: [
    CommonModule, RouterModule, AboRouterModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule, MatProgressBarModule,
    SharedModuleModule, SharedToolsModuleModule, MatSidenavModule, MatIconModule, MatNativeDateModule, MatButtonModule, MatSelectModule, MatInputModule,
    MatTableModule, MatCheckboxModule, CdkTableModule, MatPaginatorModule, MatListModule, MatDialogModule, MatExpansionModule, MatCardModule, MatFormFieldModule, MatDatepickerModule, MatMomentDateModule, MatSortModule, MatTooltipModule, MatTabsModule
  ],
  declarations: [ DetailinfoDialog, AboloeschenDialog, AbopreisDialog, AboComponent, AbolistComponent, AbodetailComponent, AbokategorienComponent, AbotermineComponent, AboumleitungenComponent, AboverwaltungComponent ],
  entryComponents: [ DetailinfoDialog, AboloeschenDialog, AbopreisDialog ],
  providers: [ AdrkundenService, LoginparameterService, ObjektauswahlService, AschluesselauswahlService,
    {provide: LOCALE_ID, useValue: environment.language },
    {provide: MAT_DATE_LOCALE, useValue: environment.language},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class AboModule { }
