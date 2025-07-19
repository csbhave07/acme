import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
    }, {
        path: ':id',
        component: UserDetailsComponent
    }
];
