import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KundenShowComponent } from './kunden-show/kunden-show.component';

const KUNDEN_ROUTES: Routes = [

    {
        path: 'kunden-show',
        component: KundenShowComponent
    }
];

export var KundenRouterModule
            = RouterModule.forChild(KUNDEN_ROUTES);