import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputIcon } from 'primeng/inputicon';
import { AvatarModule } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'auth';
import { Subject, takeUntil } from 'rxjs';
import { SidebarItem } from '../../interfaces';
@Component({
  selector: 'app-dashboard',
  imports: [PanelMenuModule, CommonModule, AvatarModule, ButtonModule, InputTextModule, InputIcon, IconField, FormsModule, CardModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  items: SidebarItem[] = [];
  sidebarVisible = false;
  private destroy$ = new Subject<void>();
  constructor(private route: Router, private authService: AuthService) { }
  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/Dashboard'
      },
      {
        label: 'Quiz History',
        icon: 'pi pi-history',
        routerLink: '/Dashboard/history'
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                localStorage.removeItem('token');
                this.route.navigateByUrl('/login');
              },
              error: (err) => {
                localStorage.removeItem('token');
                this.route.navigateByUrl('/login');
              }
            });
        }
      }
    ]
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (!this.isMobile()) {
      this.sidebarVisible = false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}