
import { AgendaitemsShowComponent } from './agendaitems-show/agendaitems-show.component';
import { ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const AGENDAITEMS_ROUTES: Routes = [

    {
        path: 'agendaitems-show',
        component: AgendaitemsShowComponent
    }
];

export var AgendaitemsRouterModule
            = RouterModule.forChild(AGENDAITEMS_ROUTES);