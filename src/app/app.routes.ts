import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth/guards/auth.guard';

export const routes: Routes = [

    {
        path: '', loadComponent: () => import('./core/layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        children: [
            { path: "", redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./core/pages/login/login.component').then(c => c.LoginComponent) },
            { path: 'register', canActivate: [guestGuard], loadComponent: () => import('./core/pages/register/register.component').then(c => c.RegisterComponent) },
            { path: 'forgetPassword', canActivate: [guestGuard], loadComponent: () => import('./core/pages/forgetpassword/forgetpassword.component').then(c => c.ForgetPasswordComponent) }
        ],
    },
    {
        path: 'Dashboard', loadComponent: () => import('./core/pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
            { path: "", redirectTo: 'subjects', pathMatch: 'full' },
            {
                path: 'subjects', canActivate: [authGuard], loadComponent: () => import('./core/pages/subjects/subjects.component').then(c => c.SubjectsComponent),
            },
            {
                path: 'exam/:id', canActivate: [authGuard], loadComponent: () => import('./core/pages/exam-details/exam-details.component').then(c => c.ExamDetailsComponent),
            }

        ],
    },



]
