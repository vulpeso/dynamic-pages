import { Component, Input } from '@angular/core';

import { DynamicComponent } from '../dynamic.component';

@Component({
  template: `
    <div class="header">
      <ul class="nav">
        <li *ngFor="let item of data.content.items">
          <a [href]="item.link">{{item.name}}</a>
        </li>
      </ul>
    </div>
  `
})
export class HeaderComponent implements DynamicComponent {
  @Input() data: any;

}
