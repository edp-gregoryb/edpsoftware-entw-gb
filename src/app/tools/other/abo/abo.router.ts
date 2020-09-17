import { RouterModule, Routes } from '@angular/router';
import { AboComponent } from './abo/abo.component';

const ABO_ROUTES: Routes = [
    {path: 'abodetail-show', component: AboComponent}
];

export var AboRouterModule
    = RouterModule.forChild(ABO_ROUTES);