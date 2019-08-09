import { Component, Input } from '@angular/core';
import { DynamicComponent } from '../dynamic.component';

@Component({
  template: `
    <div class="hero">
      <h1>{{data.content.title}}</h1>
    </div>
  `
})
export class HeroComponent implements DynamicComponent {
  @Input() data: any;

}
