import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  footerCustomStyle: string = '';
  navbarCustomStyle: string = '';

  componentsWithoutFooter: string[] = ['MapSearcherComponent'];
  componentsWithStickyNavbar: string[] = ['MapSearcherComponent'];

  constructor() { }

  ngOnInit(): void {
  }

  componentAdded(event){
    this.footerCustomStyle = this.componentsWithoutFooter.includes(event.constructor.name) ? 'hide-footer' : '';
    this.navbarCustomStyle = this.componentsWithStickyNavbar.includes(event.constructor.name) ? 'sticky-navbar' : '';
  }

}
