import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderanzeigeComponent } from '../components/headeranzeige/headeranzeige.component';
import { Title }  from '@angular/platform-browser';
import { SuchfeldComponent } from '../components/suchfeld/suchfeld.component';
//import { MaterialModule } from '@angular/material';
import { RadioButtonModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { DataTableModule,SharedModule} from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { ButtonModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { SelectButtonModule} from 'primeng/primeng';
import { ShowIconPipe } from '../pipes/show-icon.pipe';
import { AktiveitemPipe } from '../pipes/aktiveitem.pipe';
import { SafepipePipe } from '../pipes/safepipe.pipe';
import { UsdatestringtochstringPipe } from '../pipes/usdatestringtochstring.pipe';
//import { KontaktpersdropComponent } from '../components/kontaktpersdrop/kontaktpersdrop.component';
// import { AktivitaetdropComponent } from '../components/aktivitaetdrop/aktivitaetdrop.component';
// import { MitarbeiterdropComponent } from '../components/mitarbeiterdrop/mitarbeiterdrop.component';
import { DatumzeitauswahlComponent } from '../components/datumzeitauswahl/datumzeitauswahl.component';
// import { ObjektdropComponent } from '../components/objektdrop/objektdrop.component';
// import { RubrikdropComponent } from '../components/rubrikdrop/rubrikdrop.component';
// import { UrubrikdropComponent } from '../components/urubrikdrop/urubrikdrop.component';
import { KundensuchfeldComponent } from '../components/kundensuchfeld/kundensuchfeld.component';
import { AgentursuchfeldComponent } from '../components/agentursuchfeld/agentursuchfeld.component';
import { SearchpanelMerkmaleComponent } from '../dialogs/searchpanel-merkmale/searchpanel-merkmale.component';
import { SearchmerkmaleComponent } from '../components/searchmerkmale/searchmerkmale.component';
import { ChipsanzeigeComponent } from '../components/chipsanzeige/chipsanzeige.component';
import { DialogModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { TermindetailService } from '../termindetail.service';
//import { TagInputModule }  from 'ng2-tag-input';
import { AktionaktivComponent } from '../components/aktionaktiv/aktionaktiv.component';
import { WindowrefService } from '../comm/windowref.service';
//import { ProgramminformationComponent } from '../dialogs/programminformation/programminformation.component';
import { UmsatzdiagramComponent } from '../components/umsatzdiagram/umsatzdiagram.component';
//import { ChartsModule } from 'ng2-charts';
import { AuftragdetailComponent } from '../components/auftragdetail/auftragdetail.component';
//import { AuftragdetailShowComponent } from '../../auftrag/auftragdetail-show/auftragdetail-show.component';
import { AuftragdetailService } from '../services/auftragdetail.service';
import { FarosdateienService } from '../services/farosdateien.service';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ObjektdropmaterialComponent } from '../components/objektdropmaterial/objektdropmaterial.component';
import { KontaktpersdropmaterialComponent, ZustandigerDialog } from '../components/kontaktpersdropmaterial/kontaktpersdropmaterial.component';
import { AktivitaetdropmaterialComponent } from '../components/aktivitaetdropmaterial/aktivitaetdropmaterial.component';
import { AktiondropmaterialComponent } from '../components/aktiondropmaterial/aktiondropmaterial.component';
import { MitarbeiterdropmaterialComponent } from '../components/mitarbeiterdropmaterial/mitarbeiterdropmaterial.component';
import { AschluesseldropmaterialComponent } from '../components/aschluesseldropmaterial/aschluesseldropmaterial.component';
import { RubrikdropmaterialComponent } from '../components/rubrikdropmaterial/rubrikdropmaterial.component';
import { UrubrikdropmaterialComponent } from '../components/urubrikdropmaterial/urubrikdropmaterial.component';
import { SearchtermineComponent } from '../components/searchtermine/searchtermine.component';
import { SearchobjausgabeComponent } from '../components/searchobjausgabe/searchobjausgabe.component';
import { TestsearchpanelComponent } from '../components/testsearchpanel/testsearchpanel.component';
import { TestmainpanelComponent } from '../components/testmainpanel/testmainpanel.component';
import {MainpanelheadComponent, MainpanelheadDialog} from '../components/mainpanelhead/mainpanelhead.component';
// import { AschluesselauswahlService } from '../services/aschluesselauswahl.service';
import { MainpaneleditComponent } from '../components/mainpaneledit/mainpaneledit.component';
import { MainpanelnewComponent } from '../components/mainpanelnew/mainpanelnew.component';
import { InfopanelComponent } from '../components/infopanel/infopanel.component';
import { MerkmaleService } from '../services/merkmale.service';
import { FarosdateienkundeService } from '../services/farosdateienkunde.service';
import { FisFileDownloadService } from '../services/fis-file-download.service';
import { FisfiledownkundeService } from '../services/fisfiledownkunde.service';
import { PosrekapService } from '../services/posrekap.service';
import { UmsatzService } from '../umsatz.service';
import { InfopanelprojektComponent } from '../components/infopanelprojekt/infopanelprojekt.component';
import { ObjausgabesucheComponent } from '../dialogs/objausgabesuche/objausgabesuche.component';
import { KundeterminsucheComponent } from '../dialogs/kundeterminsuche/kundeterminsuche.component';
import { AllgemeineinfosComponent } from '../components/allgemeineinfos/allgemeineinfos.component';
import { InfosauftraegeComponent } from '../components/infosauftraege/infosauftraege.component';
import {InfoshistoryComponent, MemoDialog} from '../components/infoshistory/infoshistory.component';
import {DeleteOfferteDialog, InfosoffertenComponent} from '../components/infosofferten/infosofferten.component';
import { InfosmailsComponent } from '../components/infosmails/infosmails.component';
import { InfosverknuepfungComponent } from '../components/infosverknuepfung/infosverknuepfung.component';
import { SearchpanelcalendarComponent } from '../dialogs/searchpanelcalendar/searchpanelcalendar.component';
import { KundenanzeigeComponent } from '../components/kundenanzeige/kundenanzeige.component';
import { BrauchtupdateComponent } from '../dialogs/brauchtupdate/brauchtupdate.component';
import { TerminviewdialogComponent } from '../dialogs/terminviewdialog/terminviewdialog.component';
import { CheckjsonemptyPipe } from '../pipes/checkjsonempty.pipe';
import { DataPipePipe } from '../pipes/data-pipe.pipe';
import { ShowAuftragsIconPipe } from '../pipes/show-auftrags-icon.pipe';
// import { TranslatePipe } from '../../translate/translate.pipe';
import { MaterialTableComponent } from '../../../shared/components/material-table/material-table.component';
// import { ObjektauswahlService } from '../services/objektauswahl.service';
// import { AuftragbestService } from '../services/auftragbest.service';
// import { FakturaService } from '../services/faktura.service';
// import { GetofferteService } from '../services/getofferte.service';
// import { AuftragxlsxService } from '../services/auftragxlsx.service';
//import { HeadersomediaComponent } from '../../../shared/components/headersomedia/headersomedia.component';
import { AgenturwechselComponent } from '../components/agenturwechsel/agenturwechsel.component';
//test service nur einmal laden
// import { AdrkundenService } from '../adrkunden.service';
// import { LoginparameterService } from '../../shared/services/loginparameter.service';
import { CommonService } from '../../shared/comm/common.service';
import { InfosaboComponent } from '../components/infosabo/infosabo.component';
// import { LoginService } from '../../shared/login.service';
//import { SharedToolsModuleModule } from '../../../shared/module/shared-module-tools.module';
import { KundendetailsComponent } from '../components/kundendetails/kundendetails.component';
import { KundenfactsComponent }from '../components/kundenfacts/kundenfacts.component';
import { KachelcolorPipe } from '../pipes/kachelcolor.pipe';
import {ContainerComponent } from '../components/container/container.component';
import { SectioncontainerComponent } from '../components/sectioncontainer/sectioncontainer.component';
import { WindowscrollDirective } from '../components/windowscroll/windowscroll.directive';
//import { AgmCoreModule, GoogleMapsAPIWrapper,} from '@agm/core';
//import { MapComponent } from '../components/map/map.component';
import { OpenstreetmapComponent } from '../components/openstreetmap/openstreetmap.component';
import { SplitPipe } from '../pipes/split.pipe';
import {LoginComponentDialog} from '../../../../login/login.component';
import { OpendocumentsService } from '../services/opendocuments.service';

import { UploadDateiService } from '../services/uploaddatei.service';
import { KundenkarteformService } from '../../shared/services/kundenkarteform.service';
import { KundenkarteService } from '../../shared/services/kundenkarte.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {LoadingScreenComponent} from '../../../shared/components/loading-screen/loading-screen.component';
import { AnschluesseldroppastComponent } from '../components/anschluesseldroppast/anschluesseldroppast.component';
import {AdrzuComponent} from '../../../other/shared/components/adrzu/adrzu.component';

//CODN components
import { CodensucheComponent, CodeartDialog } from '../../../other/shared/components/codensuche/codensuche.component';
import { AdresssucheComponent } from '../../../other/shared/components/adresssuche/adresssuche.component';
import {EllipsisPipe} from '../pipes/ellipsis.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {CodendialogComponent} from '../dialogs/codendialog/codendialog.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ObjectinfoComponent} from '../../../other/shared/components/objectinfo/objectinfo.component';

@NgModule({
    imports: [
        CommonModule, RouterModule,
        //MaterialModule,
        RadioButtonModule,
        AutoCompleteModule,
        ButtonModule,
        FormsModule, ReactiveFormsModule, OverlayPanelModule,
        CheckboxModule, DialogModule,
        MessagesModule, CalendarModule,
        DropdownModule, DataTableModule, SharedModule,
        ChartModule,
        SelectButtonModule,
        MatDialogModule, MatIconModule, MatToolbarModule, MatMenuModule, MatAutocompleteModule, MatSelectModule, MatOptionModule, MatInputModule, MatTabsModule,
        MatButtonModule, MatListModule, MatCardModule, MatProgressBarModule, MatGridListModule, MatTooltipModule, MatSidenavModule, MatDatepickerModule,
        FlexLayoutModule, MatTableModule,
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), MatChipsModule, DragDropModule,/*, AgmCoreModule.forRoot({
      libraries: ["places"]
    }),*/
    ],
  declarations: [
    CodensucheComponent, CodeartDialog, AdresssucheComponent,
   HeaderanzeigeComponent, SuchfeldComponent,
   ShowIconPipe, SafepipePipe,
   UsdatestringtochstringPipe,

    DatumzeitauswahlComponent,
       SplitPipe,
    KundeterminsucheComponent,
    KundensuchfeldComponent,
    AgentursuchfeldComponent,
    SearchpanelMerkmaleComponent ,
    SearchmerkmaleComponent,
    ChipsanzeigeComponent,
    AktionaktivComponent,
    AktiveitemPipe,
    UmsatzdiagramComponent,
    AuftragdetailComponent, MemoDialog,
    ObjektdropmaterialComponent,
    KontaktpersdropmaterialComponent,
    AktivitaetdropmaterialComponent,
    AktiondropmaterialComponent,
    MitarbeiterdropmaterialComponent,
    AschluesseldropmaterialComponent,
    RubrikdropmaterialComponent,
    UrubrikdropmaterialComponent,SearchtermineComponent,
    SearchobjausgabeComponent,
    TestsearchpanelComponent,TestmainpanelComponent,
    MainpanelheadComponent,MainpaneleditComponent,MainpanelnewComponent,InfopanelComponent, ZustandigerDialog,
    InfopanelprojektComponent,ObjausgabesucheComponent,AllgemeineinfosComponent,InfosauftraegeComponent,
    InfoshistoryComponent,InfosoffertenComponent,InfosmailsComponent,InfosverknuepfungComponent,SearchpanelcalendarComponent,
    KundenanzeigeComponent,BrauchtupdateComponent,TerminviewdialogComponent,CheckjsonemptyPipe,DataPipePipe,ShowAuftragsIconPipe,
    AgenturwechselComponent,MaterialTableComponent, InfosaboComponent,KundendetailsComponent,KundenfactsComponent,KachelcolorPipe,ContainerComponent,SectioncontainerComponent,
    WindowscrollDirective,/*MapComponent,*/ OpenstreetmapComponent, MainpanelheadDialog, LoadingScreenComponent, AnschluesseldroppastComponent,
      AdrzuComponent, EllipsisPipe, DeleteOfferteDialog
    ],
    entryComponents: [SearchpanelMerkmaleComponent,AuftragdetailComponent,KundeterminsucheComponent,ObjausgabesucheComponent,
    SearchpanelcalendarComponent,AgenturwechselComponent, MainpanelheadDialog, MemoDialog, ZustandigerDialog, CodeartDialog, DeleteOfferteDialog],
    exports:[
      CodensucheComponent, AdresssucheComponent,
    HeaderanzeigeComponent,CommonModule,RouterModule,
    // KontaktpersdropComponent,
    // AktivitaetdropComponent,
    // MitarbeiterdropComponent,
    //DatumzeitauswahlComponent,
    // ObjektdropComponent,
    // RubrikdropComponent,
    // UrubrikdropComponent,
    SearchtermineComponent,SearchobjausgabeComponent,
    
    AktionaktivComponent,
    KundensuchfeldComponent,
    AgentursuchfeldComponent,
    SearchpanelMerkmaleComponent,
    SearchmerkmaleComponent,TestsearchpanelComponent,TestmainpanelComponent,
    MainpanelheadComponent,MainpaneleditComponent,MainpanelnewComponent,InfopanelComponent,ChipsanzeigeComponent,
    InfopanelprojektComponent, ZustandigerDialog,
    ObjausgabesucheComponent,KundeterminsucheComponent,AllgemeineinfosComponent,InfosauftraegeComponent,
    InfoshistoryComponent,InfosoffertenComponent,InfosmailsComponent,InfosverknuepfungComponent,SearchpanelcalendarComponent,
    KundenanzeigeComponent,BrauchtupdateComponent,TerminviewdialogComponent,CheckjsonemptyPipe,DataPipePipe,ShowAuftragsIconPipe,
    AgenturwechselComponent,MaterialTableComponent, InfosaboComponent,KundendetailsComponent,KundenfactsComponent,UmsatzdiagramComponent,KachelcolorPipe,ContainerComponent,SectioncontainerComponent,
    WindowscrollDirective/*,MapComponent*/, MainpanelheadDialog, LoadingScreenComponent, AnschluesseldroppastComponent, AdrzuComponent
      ],
     providers: [Title,WindowrefService,FarosdateienService,TermindetailService,
     MerkmaleService,UmsatzService,FarosdateienkundeService,FisFileDownloadService,FisfiledownkundeService,PosrekapService,
     CommonService, OpendocumentsService, UploadDateiService, KundenkarteformService, KundenkarteService/*, GoogleMapsAPIWrapper*/ ]
})
export class SharedModuleModule { }
