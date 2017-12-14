import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
// import { NgSemanticModule } from 'ng-semantic';
// import { PopupModule } from 'ng2-opd-popup';
// Fileupload
import { FileUploadModule } from 'ng2-file-upload';


// routes
import { RouterModule, Routes } from '@angular/router';

// guard
import { AuthGuard } from './guards/auth.guard';
import { RequireAnonGuard } from './guards/require-anon.guard';


// services
import { AuthService } from './services/auth.service';
import { PhotoService } from './services/photo.service';
import { UserService } from './services/user.service';


// components
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { GalleryProfileComponent } from './components/gallery-profile/gallery-profile.component';
import { PhotoOwnerComponent } from './pages/photo-owner/photo-owner.component';
import { FirstpageComponent } from './pages/firstpage/firstpage.component';

const appRoutes: Routes = [
  { path: '', canActivate: [RequireAnonGuard], component: FirstpageComponent },
  { path: 'signup', canActivate: [RequireAnonGuard], component: SignupComponent },
  { path: 'login', canActivate: [RequireAnonGuard], component: LoginComponent },
  { path: 'user/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/:id/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'photo/owner/:id/:idPhoto', component: PhotoOwnerComponent, canActivate: [AuthGuard] }

];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    EditProfileComponent,
    GalleryProfileComponent,
    PhotoOwnerComponent,
    FirstpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    // PopupModule.forRoot(),
    FormsModule,
    SuiModule,
    FileUploadModule
  ],
  providers: [AuthService, PhotoService, RequireAnonGuard, AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
