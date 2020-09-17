import { RouterModule, Routes } from '@angular/router';
import {CodenComponent} from './coden/coden.component';


const CODEN_ROUTES: Routes = [
    {path: 'coden-show', component: CodenComponent}
];

export var CodenRouterModule
    = RouterModule.forChild(CODEN_ROUTES);