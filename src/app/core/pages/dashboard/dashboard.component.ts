import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputIcon } from 'primeng/inputicon';
import { AvatarModule } from 'primeng/avatar';

import { IconField } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { ServicesService } from '../service/services.service';
@Component({
  selector: 'app-dashboard',
  imports: [PanelMenuModule, CommonModule, AvatarModule, ButtonModule, InputTextModule, InputIcon, IconField, FormsModule, CardModule, RouterOutlet], templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] | undefined;
  sidebarVisible = false;
  constructor(private service: ServicesService, private route: Router) { }
  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => {
          this.route.navigateByUrl('/Dashboard')
        },
      },
      {
        label: 'Quiz History',
        icon: 'pi pi-history',
        command: () => {
          this.route.navigateByUrl('/auth/login')
        }
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => {
          localStorage.removeItem('token');
          this.route.navigateByUrl('/auth/login')
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


}