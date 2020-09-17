import { UmsatzdetailComponent } from './umsatzdetail/umsatzdetail.component';
import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const UMSATZ_ROUTES: Routes = [

    {
        path: 'umsatzdetail-show',
        component: UmsatzdetailComponent
    }
];

export var UmsatzRouterModule
            = RouterModule.forChild(UMSATZ_ROUTES);