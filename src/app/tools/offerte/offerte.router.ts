import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferteShowComponent } from './offerte-show/offerte-show.component';

const OFFERTE_ROUTES: Routes = [

    {
        path: 'offerte-show',
        component: OfferteShowComponent
    }
];

export var OfferteRouterModule
            = RouterModule.forChild(OFFERTE_ROUTES);