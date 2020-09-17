import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import 'hammerjs';
import {AppRouterModule} from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent, LoginComponentDialog } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthGuard  } from './guards/auth.guard';
import { LoginService } from './shared/login.service';
import { ReloginService } from './shared/relogin.service';
import { CookieService } from 'ng2-cookies';
import { DataService } from './shared/data.service';
import {RestgetmoduleService} from './shared/restgetmodule.service';
import { LoginparameterService } from './tools/shared/services/loginparameter.service';
import {LoadingScreenInterceptor} from './tools/shared/components/loading-screen/loading.interceptor';
import {SharedModuleModule} from './tools/crm/shared/shared-module/shared-module.module';
import {LoadingScreenService} from './tools/shared/services/loading-screen.service';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeDe from '@angular/common/locales/de-CH';
import {IndexdbService} from './tools/other/shared/rest-services/indexdb.service';
import {DexieService} from './core/DexieService';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';







registerLocaleData(localeFr);
registerLocaleData(localeIt);
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, LoginComponentDialog
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule,
    FlexLayoutModule,
    MatToolbarModule, MatIconModule, MatButtonModule, MatInputModule, MatDialogModule, MatProgressBarModule,
    MatFormFieldModule, BrowserAnimationsModule, MatOptionModule, MatSelectModule

  ],
  entryComponents: [LoginComponentDialog],
  providers: [AuthGuard, LoginService, LoginparameterService,
    CookieService, ReloginService, DataService, RestgetmoduleService, IndexdbService,
  {provide: APP_BASE_HREF, useValue: '/edp/'}
  // , {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
 }
}

