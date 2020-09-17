import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow/workflow.component';
import { WorkflowRouterModule } from './workflow.router';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedToolsModuleModule } from '../../shared/module/shared-module-tools.module';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
registerLocaleData(localeDECH);

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
//erst mit Angular v7 moeglich
//import { DragDropModule } from '@angular/cdk/drag-drop';

//normal components
import { ArticleinfoComponent } from '../shared/components/articleinfo/articleinfo.component';
import { DetailinfoComponent } from '../shared/components/detailinfo/detailinfo.component';
import { DocsAndCommentsComponent } from '../shared/components/docs-and-comments/docs-and-comments.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import {FinishDialog, HomeComponent, ProduktdetailDialog, SavefrageDialog} from '../shared/components/home/home.component';
import { NewAndEditArticleComponent } from '../shared/components/new-and-edit-article/new-and-edit-article.component';
import { NewAndEditObjectComponent } from '../shared/components/new-and-edit-object/new-and-edit-object.component';
import { ObjectComponent } from '../shared/components/object/object.component';
import { WorkflowEditorComponent } from '../shared/components/workflow-editor/workflow-editor.component';


//dialogs
import { DeletearticledialogComponent } from '../shared/dialogs/deletearticledialog/deletearticledialog.component';
import { DeleteobjectdialogComponent } from '../shared/dialogs/deleteobjectdialog/deleteobjectdialog.component';
import { NewworkflowdialogComponent } from '../shared/dialogs/newworkflowdialog/newworkflowdialog.component';
import { DeleteworkflowdialogComponent } from '../shared/dialogs/deleteworkflowdialog/deleteworkflowdialog.component';
import { DiscardworkflowdialogComponent } from '../shared/dialogs/discardworkflowdialog/discardworkflowdialog.component';
import { ColorpickerdialogComponent } from '../shared/dialogs/colorpickerdialog/colorpickerdialog.component';
import { HelpdialogComponent } from '../shared/dialogs/helpdialog/helpdialog.component';

//services
import { FilesService } from '../shared/services/files.service';
import { WorkflowService } from '../shared/services/workflow.service';
import {RestVlobjmusterService} from '../shared/rest-services/rest-vlobjmuster.service';
import {RestVlcreatobektService} from '../shared/rest-services/rest-vlcreatobekt.service';
import {ProduktdetailsComponent} from '../shared/components/produktdetails/produktdetails.component';
import {FisVLObjektdetailsService} from '../shared/rest-services/fis-vlobjektdetails.service';
import {RestVlupdtobjektService} from '../shared/rest-services/rest-vlupdtobjekt.service';
import {RestVlgetobjtxtService} from '../shared/rest-services/rest-vlgetobjtxt.service';
import {SprachentexteComponent} from '../shared/components/sprachentexte/sprachentexte.component';
import {BrowserModule} from '@angular/platform-browser';
import {RestVlupdtobjtxtService} from '../shared/rest-services/rest-vlupdtobjtxt.service';
import {RestVlbilduploadService} from '../shared/rest-services/rest-vlbildupload.service';
import {RestVlbildlistService} from '../shared/rest-services/rest-vlbildlist.service';
import {RestVlbilddownloadService} from '../shared/rest-services/rest-vlbilddownload.service';
import {WindowrefService} from '../../shared/comm/windowref.service';
import {ShoptexteComponent} from '../shared/components/shoptexte/shoptexte.component';
import {LoginComponentDialog} from '../../../login/login.component';
import {OrderByPipe} from '../shared/pipes/order-by.pipe';
import {RestVldelteprodanhangService} from '../shared/rest-services/rest-vldelteprodanhang.service';
import {ItemObjectDirective, ObjekctcontainerComponent} from '../shared/components/objekctcontainer/objekctcontainer.component';
import {ObjektcontainersectionComponent} from '../shared/components/objektcontainersection/objektcontainersection.component';
import {NodeServiceService} from '../shared/rest-services/node-service.service';

import {MatExpansionModule} from '@angular/material/expansion';
import {WfindexdbService} from '../shared/services/wfindexdb.service';
import {DexieService} from '../../../core/DexieService';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProduktInfoDialog, UsedobjectComponent} from '../shared/components/usedobject/usedobject.component';
import {UsedObjectService} from '../shared/rest-services/used-object.service';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModuleModule} from '../../crm/shared/shared-module/shared-module.module';
import {ObjectinfoComponent} from '../shared/components/objectinfo/objectinfo.component';



@NgModule({
    imports: [CommonModule, WorkflowRouterModule, RouterModule,
        FormsModule, ReactiveFormsModule, SharedToolsModuleModule,
        MatIconModule, MatButtonModule, MatDialogModule,
        MatCheckboxModule, MatInputModule, MatSelectModule,
        MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatTabsModule, MatDividerModule, MatRadioModule,
        MatSlideToggleModule, MatAutocompleteModule, MatProgressBarModule, FlexLayoutModule, MatExpansionModule, MatTooltipModule,
        /*DragDropModule, */FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), MatTableModule, MatMenuModule],
                      
  declarations:     [ WorkflowComponent, ArticleinfoComponent, DetailinfoComponent, 
                      DocsAndCommentsComponent, HeaderComponent, 
                      HomeComponent, NewAndEditArticleComponent, NewAndEditObjectComponent, 
                      ObjectComponent, WorkflowEditorComponent, DeletearticledialogComponent, 
                      DeleteobjectdialogComponent, NewworkflowdialogComponent, 
                      DeleteworkflowdialogComponent, DiscardworkflowdialogComponent, 
                      ColorpickerdialogComponent, HelpdialogComponent, ProduktdetailsComponent, ProduktdetailDialog,
                      SprachentexteComponent, FinishDialog, ShoptexteComponent, OrderByPipe, SavefrageDialog, ObjekctcontainerComponent, ItemObjectDirective,
                      ObjektcontainersectionComponent, UsedobjectComponent, ProduktInfoDialog, ObjectinfoComponent],
                  
  providers:        [ FilesService, WorkflowService, RestVlobjmusterService, RestVlcreatobektService, FisVLObjektdetailsService,
                    RestVlupdtobjektService, RestVlgetobjtxtService, RestVlupdtobjtxtService, RestVlbilduploadService,
                    RestVlbildlistService, RestVlbilddownloadService, WindowrefService, RestVldelteprodanhangService,
                    NodeServiceService, WfindexdbService, DexieService, UsedObjectService,  {provide: LOCALE_ID, useValue: 'de-CH'}
                    ],
                      
  entryComponents:  [ DeleteobjectdialogComponent, DeletearticledialogComponent,
                      NewworkflowdialogComponent, DeleteworkflowdialogComponent,
                      DiscardworkflowdialogComponent, ColorpickerdialogComponent,
                      HelpdialogComponent, ProduktdetailsComponent, ProduktdetailDialog, SprachentexteComponent, FinishDialog,
                    SavefrageDialog, ProduktInfoDialog, ObjectinfoComponent]
})
export class WorkflowModule { }
