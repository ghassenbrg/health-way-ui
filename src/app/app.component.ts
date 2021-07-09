import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'health-way-ui';

  constructor(private primengConfig: PrimeNGConfig, private titleService: Title) {
  }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

}
