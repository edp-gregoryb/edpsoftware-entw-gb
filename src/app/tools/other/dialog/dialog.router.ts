import { RouterModule, Routes } from '@angular/router';
import {DialogComponent} from './dialog/dialog.component';


const DIALOG_ROUTES: Routes = [
    {path: 'dialog-show', component: DialogComponent}
];

export let DialogRouterModule
    = RouterModule.forChild(DIALOG_ROUTES);
