import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';



// routes
import { RouterModule, Routes } from '@angular/router';

// guard
import { AuthGuard } from './guards/auth.guard';
import { RequireAnonGuard } from './guards/require-anon.guard';


// services
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { HomeService } from './services/home.service';


// components
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

const appRoutes: Routes = [
  { path: 'signup', canActivate: [RequireAnonGuard], component: SignupComponent },
  { path: 'login', canActivate: [RequireAnonGuard], component: LoginComponent },
  { path: 'user/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
  ],
  providers: [AuthService, ProfileService, RequireAnonGuard, HomeService, AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
