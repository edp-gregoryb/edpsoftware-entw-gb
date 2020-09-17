import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoShowComponent } from './demo-show/demo-show.component';

const DEMO_ROUTES: Routes = [

    {
        path: 'demo-show',
        component: DemoShowComponent
    }
];

export var DemoRouterModule
            = RouterModule.forChild(DEMO_ROUTES);