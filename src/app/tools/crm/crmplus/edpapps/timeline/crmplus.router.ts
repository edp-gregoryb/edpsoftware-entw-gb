import { TimelinedetailComponent } from './timelinedetail/timelinedetail.component';
import { TimelinelistComponent } from './timelinelist/timelinelist.component';
import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const CRMPLUS_ROUTES: Routes = [

    {
        path: 'timelinedetail-show',
        component: TimelinedetailComponent
    },
    {
        path: 'timelinelist-show',
        component: TimelinelistComponent
    }
];

export var CrmplusRouterModule
            = RouterModule.forChild(CRMPLUS_ROUTES);