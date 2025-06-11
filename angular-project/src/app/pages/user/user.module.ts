import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

// Components
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { UserSavedComponent } from './user-saved/user-saved.component';
import { UserStyleComponent } from './user-style/user-style.component';
import { UserDiscoverComponent } from './user-discover/user-discover.component';
import { UserStyleDetailComponent } from './user-style/user-style-detail/user-style-detail.component';
import { AllStyleComponent } from './all-style/all-style.component';

import { InterestsComponent } from './user-profile/user-profile-interests/interests/interests.component';
import { StylesMeComponent } from './user-profile/user-profile-styles/styles-me/styles-me.component';
import { BodyComponent } from './user-profile/body/body.component';


const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent },
      { 
        path: 'PROILE', 
        component: UserProfileComponent,
        children: [
          { path: '', redirectTo: 'body', pathMatch: 'full' },
          { path: 'body', component:BodyComponent },
          { path: 'interests', component:InterestsComponent  },
          { path: 'styles',component:StylesMeComponent},
          { path: 'settings', component: UserSettingsComponent }
        ]
      },
      { path: 'collection', component: UserCollectionComponent },
      { path: 'saved', component: UserSavedComponent },
      { path: 'style', component: UserStyleComponent },
      { path: 'style/:id', component: UserStyleDetailComponent },
      { path: 'discover', component: UserDiscoverComponent }
    ]
  }
];

@NgModule({
  declarations: [
    UserLayoutComponent,
    UserDashboardComponent,
    UserProfileComponent,
    UserSettingsComponent,
    UserNotificationsComponent,
    UserMessagesComponent,
    UserCollectionComponent,
    UserSavedComponent,
    UserStyleComponent,
    UserDiscoverComponent,
    UserStyleDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AllStyleComponent,
    InterestsComponent,
    StylesMeComponent,
    BodyComponent,
    // Material Modules
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports: [
    UserStyleComponent,
    UserStyleDetailComponent
  ]
})
export class UserModule { } 