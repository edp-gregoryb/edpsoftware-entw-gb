import { KundensucheRouterModule } from './kundensuche.router';
import {LOCALE_ID, NgModule} from '@angular/core';
import { KundensucheShowComponent } from './kundensuche-show/kundensuche-show.component';
import { RouterModule} from '@angular/router';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { SharedToolsModuleModule } from '../../../shared/module/shared-module-tools.module';
import { FisextgetsichtService } from '../../../shared//services/fisextgetsicht.service';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { RestgetberechtstufenService } from '../../../shared/services/restgetberechtstufen.service';


import { UmsatzService } from '../../shared/umsatz.service';
import { AschluesselauswahlService } from '../../../shared/services/aschluesselauswahl.service';
import { SavetermindetailService } from '../../shared/services/savetermindetail.service';
import { DelterminService } from '../../shared/services/deltermin.service';
import { AuftragxlsxService } from '../../shared/services/auftragxlsx.service';
import { TeleupdateService } from '../../shared/services/teleupdate.service';
import { KontaktpersonService } from '../../shared/services/kontaktperson.service';
import { AktivitaetService } from '../../shared/services/aktivitaet.service';
import { MitarbeiterService } from '../../shared/services/mitarbeiter.service';
import { TerminhistoryService } from '../../shared/terminhistory.service';
import { KundenmemoService } from '../../shared/services/kundenmemo.service';
import { DelkundenmemoService } from '../../shared/services/delkundenmemo.service';
import { SavekundenmemoService } from '../../shared/services/savekundenmemo.service';
import { MerkmalbasisService } from '../../shared/services/merkmalbasis.service';
import { MerkmaladdService } from '../../shared/services/merkmaladd.service';
import { MerkmaldeleteService } from '../../shared/services/merkmaldelete.service';
import { TimelineService } from '../../shared/timeline.service';
import { VerkaufschancenService } from '../../shared/verkaufschancen.service';
import { FarosGetDateienService } from '../../shared/faros-get-dateien.service';
import { GetofferteService } from '../../shared/services/getofferte.service';
import { UnterrubrikauswahlService } from '../../../shared/services/unterrubrikauswahl.service';
import { AdrkundenService } from '../../../shared/services/adrkunden.service';

import { FisvlaboallService } from '../../shared/services/fisvlaboall.service';
import { FisvlumluntrbrdispService } from '../../shared/services/fisvlumluntrbrdisp.service';
import { WindowsizeService} from '../../../shared/services/windowsize.service';
import { RestitgetaktionService } from '../../shared/services/restitgetaktion.service';
import { RestitgeterscheinungenService } from '../../shared/services/restitgeterscheinungen.service';
import { AuftragdetailService } from '../../shared/services/auftragdetail.service';
import { AuftragbestService } from '../../shared/services/auftragbest.service';
import { FakturaService } from '../../shared/services/faktura.service';
import { FarosgetinseratejpgService } from '../../crmplus/shared/services/farosgetinseratejpg.service';
import { KundenkarteformService } from '../../shared/services/kundenkarteform.service';
import { KundenkarteService } from '../../shared/services/kundenkarte.service';
import { UploadDateiService } from '../../shared/services/uploaddatei.service';
import { WindowrefService } from '../../../shared/comm/windowref.service';
import { RestsygetdefaultService } from '../../crmplus/shared/services/restsygetdefault.service';
import { CrmEmailidService } from '../../../shared/services/restcrmemailid.service';
import {RestitgetdateienService} from '../../shared/services/restitgetdateien.service';
import {LoadingScreenInterceptor} from '../../../shared/components/loading-screen/loading.interceptor';
import {LoadingScreenService} from '../../../shared/services/loading-screen.service';
import {RestCreateadrzuService} from '../../../other/shared/rest-services/rest-createadrzu.service';
import {RestDeleteadrzuService} from '../../../other/shared/rest-services/rest-deleteadrzu.service';
import {
    CodenDialog,
    PlzortDialog, SpeichernDialog,
    UpdateNeuerKundeComponent
} from '../../shared/components/update-neuer-kunde/update-neuer-kunde.component';
import {RestgetadrhauptService} from '../../shared/services/restgetadrhaupt.service';
import {ProgramminformationComponent} from '../../../shared/dialogs/programminformation/programminformation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {RestinsdeleteofferteService} from '../../shared/services/restinsdeleteofferte.service';
import {RestdeleteadrhauptService} from '../../shared/services/restdeleteadrhaupt.service';
import {DeleteAdresseDialog} from '../../shared/components/kundenfacts/kundenfacts.component';
import {CodendialogComponent} from '../../shared/dialogs/codendialog/codendialog.component';
import {RestupdateadrhauptService} from '../../shared/services/restupdateadrhaupt.service';
import {RestgetplzortService} from '../../shared/services/restgetplzort.service';
import {RestcreateadrhauptService} from '../../shared/services/restcreateadrhaupt.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {RestitauftraggesamtService} from '../../shared/services/restitauftraggesamt.service';


@NgModule({
    declarations: [
     KundensucheShowComponent, UpdateNeuerKundeComponent, CodenDialog, DeleteAdresseDialog, CodendialogComponent, PlzortDialog, SpeichernDialog
    ],
    entryComponents: [CodenDialog, DeleteAdresseDialog, PlzortDialog, SpeichernDialog],
    imports: [
        RouterModule, KundensucheRouterModule,
        SharedToolsModuleModule,
        HttpClientModule, CommonModule, SharedModuleModule, MatCheckboxModule, MatMenuModule,
        RouterModule, FlexLayoutModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatSlideToggleModule, MatInputModule,
        MatCardModule, MatListModule, MatIconModule, MatTableModule, MatToolbarModule, MatProgressBarModule, MatExpansionModule, MatSidenavModule, MatButtonToggleModule,
        MatDialogModule, MatAutocompleteModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatChipsModule, MatSnackBarModule, DragDropModule
    ],
    providers: [
        FisextgetsichtService,LoginparameterService,RestgetberechtstufenService,AschluesselauswahlService,
        SavetermindetailService,DelterminService,AuftragxlsxService,TeleupdateService,KontaktpersonService,
        AktivitaetService,MitarbeiterService,TerminhistoryService,KundenmemoService,DelkundenmemoService,
        SavekundenmemoService,MerkmalbasisService,MerkmaladdService,MerkmaldeleteService,TimelineService,
        VerkaufschancenService,FarosGetDateienService,GetofferteService,UnterrubrikauswahlService,
        AdrkundenService, FisvlumluntrbrdispService,FisvlaboallService,WindowsizeService,RestitgetaktionService,RestitgeterscheinungenService, UmsatzService,
        AuftragdetailService,AuftragbestService,FakturaService,FarosgetinseratejpgService,KundenkarteformService,KundenkarteService,UploadDateiService,WindowrefService,
        RestsygetdefaultService, CrmEmailidService, RestitgetdateienService,LoadingScreenService, RestCreateadrzuService, RestinsdeleteofferteService,
        RestupdateadrhauptService, RestgetplzortService, RestcreateadrhauptService,RestitauftraggesamtService,
        RestDeleteadrzuService, RestgetadrhauptService, RestdeleteadrhauptService, {provide: LOCALE_ID, useValue: 'de-CH'},
        {provide: APP_BASE_HREF, useValue: '/edp/'}
        ,
        {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
    ]
})
export class KundensucheModule {

}
