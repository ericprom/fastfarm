import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AuthGuard } from './auth.service';
import { routes } from './app.routes';

import * as config from './app.config';
import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu.component';
import { SubmenuComponent } from './layout/submenu.component';
import { FooterComponent } from './layout/footer.component';
import { HelpcenterComponent } from './layout/helpcenter.component';

import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { UploadImagesService } from './services/upload-images.service';
import { ServiceList } from './services/service-list.service';
import { UserProfile } from './services/user-profile.service';

import { LoginComponent } from './login/login.component';
import { MarketComponent } from './market/market.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceComponent } from './service/service.component';
import { RequestComponent } from './request/request.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SubmenuComponent,
    FooterComponent,
    HelpcenterComponent,
    NgDropFilesDirective,
    LoginComponent,
    MarketComponent,
    AccountComponent,
    DashboardComponent,
    ServiceComponent,
    RequestComponent,
    AboutComponent,
    ContactComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config.firebaseConfig),
    routes
  ],
  providers: [
    AuthGuard,
    UploadImagesService,
    ServiceList,
    UserProfile
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
