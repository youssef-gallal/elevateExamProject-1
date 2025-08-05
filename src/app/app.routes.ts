import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { ForgetPasswordComponent } from './core/pages/forgetpassword/forgetpassword.component';
export const routes: Routes = [


    {
        path: 'auth', loadComponent: () => import('./core/layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        children: [
            { path: "", redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./core/pages/login/login.component').then(c => c.LoginComponent) },
            { path: 'register', loadComponent: () => import('./core/pages/register/register.component').then(c => c.RegisterComponent) },
            { path: 'forgetPassword', loadComponent: () => import('./core/pages/forgetpassword/forgetpassword.component').then(c => c.ForgetPasswordComponent) }
        ]
    },
]
