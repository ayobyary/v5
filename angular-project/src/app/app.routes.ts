import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UserSettingsComponent } from './pages/user/user-settings/user-settings.component';
import { UserNotificationsComponent } from './pages/user/user-notifications/user-notifications.component';
import { UserMessagesComponent } from './pages/user/user-messages/user-messages.component';
import { UserCollectionComponent } from './pages/user/user-collection/user-collection.component';
import { UserSavedComponent } from './pages/user/user-saved/user-saved.component';
import { UserStyleComponent } from './pages/user/user-style/user-style.component';
import { UserDiscoverComponent } from './pages/user/user-discover/user-discover.component';
import { UserStyleDetailComponent } from './pages/user/user-style/user-style-detail/user-style-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'settings', component: UserSettingsComponent },
      { path: 'notifications', component: UserNotificationsComponent },
      { path: 'messages', component: UserMessagesComponent },
      { path: 'collection', component: UserCollectionComponent },
      { path: 'saved', component: UserSavedComponent },
      { path: 'style', component: UserStyleComponent },
      { path: 'style/:id', component: UserStyleDetailComponent },
      { path: 'discover', component: UserDiscoverComponent }
    ]
  }
]; 