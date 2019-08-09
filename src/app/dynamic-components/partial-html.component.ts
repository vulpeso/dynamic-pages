import { Component, Input } from '@angular/core';

import { DynamicComponent } from '../dynamic.component';

@Component({
  template: `
    <div [innerHtml]="data.content.html"></div>
  `
})
export class PartialHtmlComponent implements DynamicComponent {
  @Input() data: any;

}
