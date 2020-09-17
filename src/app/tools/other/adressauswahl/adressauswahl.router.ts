import { RouterModule, Routes } from '@angular/router';
import { AdressauswahlComponent } from './adressauswahl/adressauswahl.component';

const ADRESSAUSWAHL_ROUTES: Routes = [
    {path: 'adressauswahl-show', component: AdressauswahlComponent}
];

export var AdressauswahlRouterModule
    = RouterModule.forChild(ADRESSAUSWAHL_ROUTES);
