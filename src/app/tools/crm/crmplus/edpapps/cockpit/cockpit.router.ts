import { CockpitComponent } from './cockpit/cockpit.component';
import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const COCKPIT_ROUTES: Routes = [

    {
        path: 'cockpit',
        component: CockpitComponent
    }
];

export var CockpitRouterModule
            = RouterModule.forChild(COCKPIT_ROUTES);