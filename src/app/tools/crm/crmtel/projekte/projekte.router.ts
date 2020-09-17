
import { ProjekteShowComponent } from './projekte-show/projekte-show.component';
import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const PROJEKTE_ROUTES: Routes = [
    {
        path: 'projekte-show',
        component: ProjekteShowComponent
    }
];

export var ProjekteRouterModule
            = RouterModule.forChild(PROJEKTE_ROUTES);