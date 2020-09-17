import { OfferteRouterModule } from './offerte.router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
registerLocaleData(localeDECH);
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OfferteShowComponent } from './offerte-show/offerte-show.component';
import { DialogObjektAuswahlDialog } from './offerte-show/offerte-show.component';
import { OfferteshowService } from './shared/services/offerteshow.service';
import { WerbeformateService } from './shared/services/werbeformate.service';
import { ObjektauswahlService } from './../shared/services/objektauswahl.service';
import { RubrikauswahlService } from './../shared/services/rubrikauswahl.service';
import { UnterrubrikauswahlService } from './../shared/services/unterrubrikauswahl.service';
import { WindowrefService } from './../shared/comm/windowref.service';
import { PlatzierungsauswahlService } from './shared/services/platzierungsauswahl.service';
import { PreispositionenService } from './shared/services/preispositionen.service';
import { AschluesselauswahlService } from './../shared/services/aschluesselauswahl.service';
import { A4Hoch1Component } from './offerte-show/templates/a4-hoch-1/a4-hoch-1.component';
import { A4Hoch2Component } from './offerte-show/templates/a4-hoch-2/a4-hoch-2.component';
import { A4Hoch3Component } from './offerte-show/templates/a4-hoch-3/a4-hoch-3.component';
import { A4Hoch4Component } from './offerte-show/templates/a4-hoch-4/a4-hoch-4.component';
import { A4Quer1Component } from './offerte-show/templates/a4-quer-1/a4-quer-1.component';
import { A4Quer2Component } from './offerte-show/templates/a4-quer-2/a4-quer-2.component';
import { A4Quer3Component } from './offerte-show/templates/a4-quer-3/a4-quer-3.component';
import { A4Quer4Component } from './offerte-show/templates/a4-quer-4/a4-quer-4.component';
import { A4Quer5Component } from './offerte-show/templates/a4-quer-5/a4-quer-5.component';
import { A4Quer6Component } from './offerte-show/templates/a4-quer-6/a4-quer-6.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AbschlussService } from './shared/services/abschluss.service';
import { FindandaddPipe } from './shared/pipes/findandadd.pipe';
import { WhprozentPipe } from './shared/pipes/whprozent.pipe';
import { SPprozentPipe } from './shared/pipes/spprozent.pipe';
import { SPfrankenPipe } from './shared/pipes/spfranken.pipe';
import { HeadersomediaComponent } from '../shared/components/headersomedia/headersomedia.component';
import { LoginparameterService } from '../shared/services/loginparameter.service';
import { SharedToolsModuleModule } from '../shared/module/shared-module-tools.module';
import { LoginService } from '../../shared/login.service';
import { CrmEmailidService } from '../shared/services/restcrmemailid.service';
import { CrmMailversandService } from '../shared/services/restcrmmailversand.service';

import {MatSidenavModule} from '@angular/material/sidenav';
import { environment } from '../../../environments/environment';
import {A4Hoch5Component} from './offerte-show/templates/a4-hoch-5/a4-hoch-5.component';
import {AdrvermittlerService} from '../crm/shared/services/adrvermittler.service';




@NgModule({
    declarations: [
        OfferteShowComponent,
        DialogObjektAuswahlDialog,
        A4Hoch1Component,
        A4Hoch2Component,
        A4Hoch3Component,
        A4Hoch4Component,
        A4Hoch5Component,
        A4Quer1Component,
        FindandaddPipe,
        WhprozentPipe,
        SPprozentPipe,
        SPfrankenPipe,
        A4Quer2Component, HeadersomediaComponent,
        A4Quer3Component,
        A4Quer4Component,
        A4Quer5Component,
        A4Quer6Component
       
    ],
    imports: [
        OfferteRouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule, MatDialogModule, MatTooltipModule, MatOptionModule, MatSelectModule, MatAutocompleteModule, MatToolbarModule,
        MatMenuModule, MatInputModule, MatFormFieldModule, MatRadioModule,MatCardModule,MatCheckboxModule,MatButtonModule,  MatIconModule, MatProgressBarModule,
        FlexLayoutModule,MatSidenavModule,
        SharedToolsModuleModule,
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
    ],
    entryComponents: [
        DialogObjektAuswahlDialog
        ],

    providers: [
        OfferteshowService, CrmEmailidService, CrmMailversandService,
        WerbeformateService, PlatzierungsauswahlService, PreispositionenService, AschluesselauswahlService,WindowrefService,LoginparameterService,
        ObjektauswahlService, RubrikauswahlService, UnterrubrikauswahlService, LoginService, AbschlussService, AdrvermittlerService,
        {provide: LOCALE_ID, useValue: environment.language}
    ]
})
export class OfferteModule {

}
