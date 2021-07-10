import { Component, OnInit } from '@angular/core';
import { FOOTER_ITEMS } from '@core/config/nav_items';
import { roles } from '@core/config/roles';
import { NavItem } from '@models/navItem.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  rolesEnum = roles;
  navItems: NavItem[] = FOOTER_ITEMS;
  
  constructor() { }

  ngOnInit(): void {
  }

}
