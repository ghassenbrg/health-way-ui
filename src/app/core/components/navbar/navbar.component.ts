import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { NAV_ITEMS } from '@core/config/nav_items';
import { NavItem } from '@models/navItem.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navItems: NavItem[] = NAV_ITEMS;
  currentPath: string = '';

  constructor(private _auth: AuthenticationService, private router: Router) { }

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
    console.log(currentUrl)
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
    this.router.navigate(['/login']);
  }

}
