import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { ServicesService } from '../service/services.service';
@Component({
  selector: 'app-dashboard',
  imports: [PanelMenuModule, CommonModule, RouterLink, ButtonModule, InputTextModule, InputIcon, IconField, FormsModule, CardModule, RouterOutlet], templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] | undefined;
  constructor(private service: ServicesService) { }
  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',


      },
      {
        label: 'Quiz History',
        icon: 'pi pi-history',

      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',

      }
    ]

  }






}