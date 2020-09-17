import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramminformationComponent } from '../dialogs/programminformation/programminformation.component';
import { MaterialTableComponent } from '../components/material-table/material-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultheaderComponent } from '../components/defaultheader/defaultheader.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { HomeComponent } from '../components/home/home.component';
import { SichtComponent } from '../components/sicht/sicht.component';
import { CustomersearchComponent } from '../components/customersearch/customersearch.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';

@NgModule({
 imports: [CommonModule,
     MatMenuModule, MatInputModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatSelectModule, MatTooltipModule,MatButtonToggleModule,
    MatTableModule, MatToolbarModule, MatProgressBarModule, MatSidenavModule, MatCheckboxModule, MatGridListModule, MatFormFieldModule,
    ReactiveFormsModule ,FormsModule],

declarations: [ProgramminformationComponent, DefaultheaderComponent, SidenavComponent, HomeComponent, SichtComponent, CustomersearchComponent],
entryComponents: [ProgramminformationComponent],
 exports:[ProgramminformationComponent, DefaultheaderComponent, SidenavComponent, HomeComponent, SichtComponent, CustomersearchComponent],
providers: []
})
export class SharedToolsModuleModule { }