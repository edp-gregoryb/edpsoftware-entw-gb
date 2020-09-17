import { RouterModule, Routes } from '@angular/router';
import {AdressverwaltungShowComponent} from './adressverwaltung-show/adressverwaltung-show.component';


const ADRESSVERWALTUNG_ROUTES: Routes = [
    {path: 'adressverwaltung-show', component: AdressverwaltungShowComponent}
];

export var AdressverwaltungRouterModule
    = RouterModule.forChild(ADRESSVERWALTUNG_ROUTES);