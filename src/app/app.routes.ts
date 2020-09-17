// import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { NgModule }             from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, PreloadingStrategy, Route, NoPreloading} from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

const APP_ROUTE_CONFIG: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },


            {
                canActivate: [AuthGuard],
                path: 'agendaview',
                loadChildren: () => import('./tools/crm/crmtel/agendaitems/agendaitems.module').then(m => m.AgendaitemsModule)

            },
            {
                canActivate: [AuthGuard],
                path: 'projektview',
                loadChildren: () => import('./tools/crm/crmtel/projekte/projekte.module').then(m => m.ProjekteModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'kundenview',
                loadChildren: () => import('./tools/crm/crmtel/kunden/kunden.module').then(m => m.KundenModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'kundensucheview',
                loadChildren: () => import('./tools/crm/crmtel/kundensuche/kundensuche.module').then(m => m.KundensucheModule)
            },

            {
                canActivate: [AuthGuard],
                path: 'offertview',
                loadChildren: () => import('./tools/offerte/offerte.module').then(m => m.OfferteModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'timelinedetailview',
                loadChildren: () => import('./tools/crm/crmplus/edpapps/timeline/crmplus.module').then(m => m.CrmplusModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'timelinelistview',
                loadChildren: () => import('./tools/crm/crmplus/edpapps/timeline/crmplus.module').then(m => m.CrmplusModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'umsatzdetailview',
                loadChildren: () => import('./tools/crm/crmplus/edpapps/umsatz/umsatz.module').then(m => m.UmsatzModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'cockpitview',
                loadChildren: () => import( './tools/crm/crmplus/edpapps/cockpit/cockpit.module').then(m => m.CockpitModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'demo',
                loadChildren: () => import('./tools/demo/demo.module').then(m => m.DemoModule)
            },
            {
                path: 'terminlistview',
                loadChildren: () => import('./tools/crm/crmplus/edpapps/termin/termin.module').then(m => m.TerminModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'termindetailview',
                loadChildren: () => import('./tools/crm/crmplus/edpapps/termin/termin.module').then(m => m.TerminModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'workflow',
                loadChildren: () => import('./tools/other/workflow/workflow.module').then(m => m.WorkflowModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'adresselect',
                loadChildren: () => import('./tools/other/adresselect/adresselect.module').then(m => m.AdresselectModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'adressverwaltung',
                loadChildren: () => import('./tools/other/adressverwaltung/adressverwaltung.module').then(m => m.AdressverwaltungModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'coden',
                loadChildren: () => import('./tools/other/coden/coden.module').then(m => m.CodenModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'abodetailview',
                loadChildren: () => import('./tools/other/abo/abo.module').then(m => m.AboModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'adressauswahl',
                loadChildren: () => import('./tools/other/adressauswahl/adressauswahl.module').then(m => m.AdressauswahlModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'dialog',
                loadChildren: () => import('./tools/other/dialog/dialog.module').then(m => m.DialogModule)
            },
    {
        canActivate: [AuthGuard],
        path: 'demo',
        loadChildren: () => import('./tools/demo/demo.module').then(m => m.DemoModule)
    },
    ];



// const APP_ROUTE_CONFIG: Routes = [
//     {
//         path: '',
//         redirectTo: 'login',
//         pathMatch: 'full'
//     },
//     {
//         path: 'login',
//         component: LoginComponent
//     }
//     ,
//     {
//         path: 'agendaview', canActivate: [AuthGuard],
//         loadChildren: () => import('./tools/crm/crmtel/agendaitems/agendaitems.module').then(m => m.AgendaitemsModule)
//         // loadChildren: './tools/crm/crmtel/agendaitems/agendaitems.module#AgendaitemsModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'projektview',
//         loadChildren: './tools/crm/crmtel/projekte/projekte.module#ProjekteModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'kundenview',
//         loadChildren: './tools/crm/crmtel/kunden/kunden.module#KundenModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'kundensucheview',
//         loadChildren: './tools/crm/crmtel/kundensuche/kundensuche.module#KundensucheModule', canActivate: [AuthGuard]
//     },
//
//     {
//         path: 'offertview',
//         loadChildren: './tools/offerte/offerte.module#OfferteModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'timelinedetailview',
//         loadChildren: './tools/crm/crmplus/edpapps/timeline/crmplus.module#CrmplusModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'timelinelistview',
//         loadChildren: './tools/crm/crmplus/edpapps/timeline/crmplus.module#CrmplusModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'umsatzdetailview',
//         loadChildren: './tools/crm/crmplus/edpapps/umsatz/umsatz.module#UmsatzModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'cockpitview',
//         loadChildren: './tools/crm/crmplus/edpapps/cockpit/cockpit.module#CockpitModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'demo',
//         loadChildren: './tools/demo/demo.module#DemoModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'terminlistview',
//         loadChildren: './tools/crm/crmplus/edpapps/termin/termin.module#TerminModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'termindetailview',
//         loadChildren: './tools/crm/crmplus/edpapps/termin/termin.module#TerminModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'workflow',
//         loadChildren: './tools/other/workflow/workflow.module#WorkflowModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'adresselect',
//         loadChildren: './tools/other/adresselect/adresselect.module#AdresselectModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'adressverwaltung',
//         loadChildren: './tools/other/adressverwaltung/adressverwaltung.module#AdressverwaltungModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'coden',
//         loadChildren: './tools/other/coden/coden.module#CodenModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'abodetailview',
//         loadChildren: './tools/other/abo/abo.module#AboModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'adressauswahl',
//         loadChildren: './tools/other/adressauswahl/adressauswahl.module#AdressauswahlModule', canActivate: [AuthGuard]
//     },
//     {
//         path: 'dialog',
//         loadChildren: './tools/other/dialog/dialog.module#DialogModule', canActivate: [AuthGuard]
//     }
// ];

// implements PreloadingStrategy 
// export class CustomPreloadingStrategy implements PreloadingStrategy{
//
//     // preload(route: Route, fn: () => Observable<any>): Observable<any> {
//
//     //     return of(true).delay(7000).flatMap(_ => fn());
//
//     // }
//     preload(route: Route, preload: Function): Observable<any> {
//     if (route.data && route.data.preload) {
//       return preload();
//     } else {
//       return Observable.of(null);
//     }
//   }
//
// }

 // export const APP_ROUTE_PROVIDERS = [CustomPreloadingStrategy];
 
@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTE_CONFIG, {useHash: true, preloadingStrategy: NoPreloading}) ],
  exports: [ RouterModule ]
})
export class AppRouterModule {};// = RouterModule.forRoot(APP_ROUTE_CONFIG, { preloadingStrategy: CustomPreloadingStrategy });
