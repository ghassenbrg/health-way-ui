import { Component, Input, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MainComponent } from '@app/main/main.component';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { NAV_ITEMS } from '@core/config/nav_items';
import { roles } from '@core/config/roles';
import { NavItem } from '@models/navItem.model';
import { User } from '@models/user.model';
import { USER_MENU_ITEMS } from './../../config/nav_items';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() currentUser: User;

  rolesEnum = roles;
  navItems: NavItem[] = NAV_ITEMS;
  userMenuItems: NavItem[] = USER_MENU_ITEMS;

  currentPath: string = '';

  constructor(
    private _auth: AuthenticationService,
    private router: Router,
    private mainComponent: MainComponent) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.checkActiveRoute();
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });

  }

  ngOnInit(): void {
    this.navItems.forEach(navItem => {
      if (navItem.children && navItem.children.length > 0) {
        navItem.path = undefined;
      }
    });
    this.checkActiveRoute();
  }

  checkActiveRoute() {
    const currentUrl = this.router.url;
    if (this.navItems) {
      this.navItems.forEach(navItem => {
        navItem.isActive = false;
        let itemPath = navItem.path && navItem.path.startsWith('/') ? navItem.path : '/' + navItem.path;
        if (navItem.children && navItem.children.length > 0) {
          navItem.children.forEach(childItem => {
            let childPath = childItem.path && childItem.path.startsWith('/') ? childItem.path : '/' + childItem.path;
            if (childPath == currentUrl) {
              childItem.isActive = true;
              navItem.isActive = true;
            } else {
              childItem.isActive = false;
            }
          })
        }
        if (!navItem.isActive && itemPath == currentUrl) {
          navItem.isActive = true;
        }
      });
    }
  }

  logout() {
    this._auth.logout();
    this.mainComponent.refreshCurrentUser();
  }

}
