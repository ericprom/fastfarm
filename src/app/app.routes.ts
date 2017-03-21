import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.service';
import { LoginComponent } from './login/login.component';
import { MarketComponent } from './market/market.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceComponent } from './service/service.component';
import { RequestComponent } from './request/request.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';

export const router: Routes = [
    { path: '', component: MarketComponent},
    { path: 'market', component: MarketComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { 
    	path: 'system',  
    	 children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: LoginComponent
            }
        ]
    },
    { 
    	path: 'account',
        children: [
            {
                path: '',
                component: AccountComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: AccountComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'service',
		        children: [
		            {
		                path: '',
		                component: ServiceComponent,
		                canActivate: [AuthGuard]
		            },
		            {
		                path: ':id',
		                component: ServiceComponent,
		                canActivate: [AuthGuard]
		            }
		        ]
            },
            {
                path: 'request',
                component: RequestComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    { path: '**', component: ErrorComponent},
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);