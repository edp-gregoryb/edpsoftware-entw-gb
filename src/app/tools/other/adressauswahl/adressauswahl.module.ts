//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdressauswahlRouterModule } from './adressauswahl.router';
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
import { AdressauswahlComponent } from './adressauswahl/adressauswahl.component';
//Dialogs

@NgModule({
  imports: [
    CommonModule, RouterModule, AdressauswahlRouterModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule, MatProgressBarModule,
    SharedModuleModule, SharedToolsModuleModule, MatSidenavModule, MatIconModule, MatNativeDateModule, MatButtonModule, MatSelectModule, MatInputModule,
    MatTableModule, MatCheckboxModule, CdkTableModule, MatPaginatorModule, MatListModule, MatDialogModule, MatExpansionModule, MatCardModule, MatFormFieldModule, MatDatepickerModule, MatSortModule, MatTooltipModule
  ],
  declarations: [AdressauswahlComponent],
  providers: [AdrkundenService, ObjektauswahlService, AschluesselauswahlService, LoginparameterService]
})
export class AdressauswahlModule { }
