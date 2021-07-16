import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { Doctor } from '@models/doctor.model';
import { NavItemChild } from '@models/navItem.model';
import { DOCOTR_DASHBOARD_ITEMS } from './../../core/config/nav_items';

@Component({
  selector: 'app-doctor-dashboard-container',
  templateUrl: './doctor-dashboard-container.component.html',
  styleUrls: ['./doctor-dashboard-container.component.scss'],
})
export class DoctorDashboardContainerComponent implements OnInit {
  currentUser: any = new Doctor();
  currentItem: NavItemChild = new NavItemChild();
  doctorDashboardItems: NavItemChild[] = DOCOTR_DASHBOARD_ITEMS;
  constructor(private _auth: AuthenticationService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute();
        // Hide loading indicator
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this._auth.currentUser;
    this._auth.currentUserSubject.subscribe(
      (user) => (this.currentUser = user)
    );
    this._auth.refreshCurrentUser();
  }

  checkActiveRoute() {
    const currentUrl = this.router.url;
    if (this.doctorDashboardItems) {
      this.doctorDashboardItems.forEach((navItem) => {
        navItem.isActive = false;
        let itemPath =
          navItem.path && navItem.path.startsWith('/')
            ? navItem.path
            : '/' + navItem.path;
        if (!navItem.isActive && itemPath == currentUrl) {
          navItem.isActive = true;
          this.currentItem = navItem;
        }
      });
    }
  }
}
