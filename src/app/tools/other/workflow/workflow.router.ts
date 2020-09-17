import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowComponent } from './workflow/workflow.component';

import { ObjectComponent } from '../shared/components/object/object.component';
import { DetailinfoComponent } from '../shared/components/detailinfo/detailinfo.component';
import { ArticleinfoComponent } from '../shared/components/articleinfo/articleinfo.component';
import { NewAndEditObjectComponent } from '../shared/components/new-and-edit-object/new-and-edit-object.component';
import { NewAndEditArticleComponent } from '../shared/components/new-and-edit-article/new-and-edit-article.component';
import { WorkflowEditorComponent } from '../shared/components/workflow-editor/workflow-editor.component';
import { ObjectinfoComponent } from '../shared/components/objectinfo/objectinfo.component';
import {UsedobjectComponent} from '../shared/components/usedobject/usedobject.component';

const WORKFLOW_ROUTES: Routes = [
    
    { path: '', redirectTo: 'workflow-show', pathMatch: 'full' },
    { path: 'workflow-show', component: WorkflowComponent },
    { path: 'workflow-show/object/:objekt/:aschlussel', component: ObjectComponent },
    { path: 'workflow-show/detailinfo/:objectId/:articleId/:taskId', component: DetailinfoComponent },
    { path: 'workflow-show/articleInfo/:objekt/:aschlussel/:articleId', component: ArticleinfoComponent },
    { path: 'workflow-show/productInfo/:objekt/:aschlussel', component: ObjectinfoComponent },
    { path: 'workflow-show/newOrEditObject', component: NewAndEditObjectComponent },
    { path: 'workflow-show/newOrEditArticle', component: NewAndEditArticleComponent },
    { path: 'workflow-show/Editor', component: WorkflowEditorComponent },
    { path: 'workflow-show/bestehendeworkfows', component: UsedobjectComponent}
];

export var WorkflowRouterModule
    = RouterModule.forChild(WORKFLOW_ROUTES);