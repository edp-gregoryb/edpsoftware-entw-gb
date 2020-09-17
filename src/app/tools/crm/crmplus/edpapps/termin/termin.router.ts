import { TerminlistComponent } from './terminlist/terminlist.component';
import { TermindetailComponent } from './termindetail/termindetail.component';
import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const TERMIN_ROUTES: Routes = [

    {
        path: 'terminlist-show',
        component: TerminlistComponent
    },
    {
        path: 'termindetail-show',
        component: TermindetailComponent
    }
];

export var TerminRouterModule
            = RouterModule.forChild(TERMIN_ROUTES);