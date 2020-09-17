import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KundensucheShowComponent } from './kundensuche-show/kundensuche-show.component';
import {UpdateNeuerKundeComponent} from '../../shared/components/update-neuer-kunde/update-neuer-kunde.component';

const KUNDENSUCHE_ROUTES: Routes = [

    {
        path: 'kundensuche-show',
        component: KundensucheShowComponent
    },
    {
        path: 'neuerkunde-show',
        component: UpdateNeuerKundeComponent
    }
];

export var KundensucheRouterModule
            = RouterModule.forChild(KUNDENSUCHE_ROUTES);


