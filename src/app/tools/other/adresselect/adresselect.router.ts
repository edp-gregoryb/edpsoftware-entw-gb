import { RouterModule, Routes } from '@angular/router';
import {AdresselectComponent} from './adresselect/adresselect.component';

const ADRESSELECT_ROUTES: Routes = [
    {path: 'adresselect-show', component: AdresselectComponent}
];

export var AdresselectRouterModule
    = RouterModule.forChild(ADRESSELECT_ROUTES);
