import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { UmsatzkundeComponent } from '../components/umsatzkunde/umsatzkunde.component';
import { UmsatzvermittlerComponent } from '../components/umsatzvermittler/umsatzvermittler.component';
import { UmsatzobjektComponent } from '../components/umsatzobjekt/umsatzobjekt.component';
import { RubrikComponent } from '../components/rubrik/rubrik.component';

import { UmsatzvertreterComponent } from '../components/umsatzvertreter/umsatzvertreter.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TimelinekundeComponent } from '../components/timelinekunde/timelinekunde.component';
import { TimelinevertreterComponent } from '../components/timelinevertreter/timelinevertreter.component';
import { TimelinevermittlerComponent } from '../components/timelinevermittler/timelinevermittler.component';
import { TimelineobjektComponent } from '../components/timelineobjekt/timelineobjekt.component';
import { TimelinerubrikComponent } from '../components/timelinerubrik/timelinerubrik.component';
import { TimelineartComponent } from '../components/timelineart/timelineart.component';

// import { NguUtilityModule } from 'ngu-utility/dist';

import { CockpitverkaufschancenComponent } from '../components/cockpitverkaufschancen/cockpitverkaufschancen.component';
import { CockpittimelineComponent } from '../components/cockpittimeline/cockpittimeline.component';
import { CockpitumsatzComponent } from '../components/cockpitumsatz/cockpitumsatz.component';
import { CockpitnextterminComponent } from '../components/cockpitnexttermin/cockpitnexttermin.component';
import { TerminaktionComponent } from '../components/terminaktion/terminaktion.component';
import { TerminaktivitaetComponent } from '../components/terminaktivitaet/terminaktivitaet.component';
import { TerminmitarbeiterComponent } from '../components/terminmitarbeiter/terminmitarbeiter.component';
 import { GoogleChartComponent} from '../components/googlechart/googlechart.component';
 
 import { ArtComponent } from '../components/art/art.component';
 import { AufnummerComponent } from '../components/aufnummer/aufnummer.component';
import {ShowColumnDirective} from '../directives/ShowColumn.directive';



@NgModule({
 imports: [ReactiveFormsModule, FormsModule,CommonModule,RouterModule,MatMenuModule,
 MatSelectModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatSlideToggleModule, MatInputModule, MatCardModule, MatListModule,MatSnackBarModule,
 MatIconModule, MatTableModule, MatToolbarModule, MatProgressBarModule, MatExpansionModule, MatDialogModule, MatAutocompleteModule, MatButtonModule,MatTooltipModule,
 CdkTableModule, FlexLayoutModule,  MatPaginatorModule],
 declarations: [UmsatzkundeComponent, UmsatzvermittlerComponent, UmsatzobjektComponent, UmsatzvertreterComponent, RubrikComponent,
 TimelinekundeComponent, TimelinevertreterComponent, TimelinevermittlerComponent, TimelineobjektComponent, TimelinerubrikComponent, TimelineartComponent,
 CockpitverkaufschancenComponent, CockpittimelineComponent, CockpitumsatzComponent, CockpitnextterminComponent, GoogleChartComponent,
 ArtComponent, AufnummerComponent, ShowColumnDirective, TerminaktionComponent,TerminaktivitaetComponent,TerminmitarbeiterComponent],
 entryComponents: [],
 exports:[UmsatzkundeComponent, UmsatzvermittlerComponent, UmsatzobjektComponent, UmsatzvertreterComponent, RubrikComponent,
 TimelinekundeComponent, TimelinevertreterComponent, TimelinevermittlerComponent, TimelineobjektComponent, TimelinerubrikComponent, TimelineartComponent,
 CockpitverkaufschancenComponent, CockpittimelineComponent, CockpitumsatzComponent, CockpitnextterminComponent, GoogleChartComponent,ArtComponent, AufnummerComponent,
 ShowColumnDirective, TerminaktionComponent,TerminaktivitaetComponent,TerminmitarbeiterComponent],
 providers: [],
})
export class SharedModuleCrmplusModule { }