import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { DynamicDirective } from '../dynamic.directive';
import { DynamicItem }      from '../dynamic-item';
import { DynamicComponent } from '../dynamic.component';

@Component({
  template: `
    <div class="content-wrapper">
      <div class="content-wrapper__inner-container">
        <ng-template dynamic-host></ng-template>
      </div>
    </div>
  `
})
export class ContentWrapperComponent implements DynamicComponent {
  @Input() data: any;
  @ViewChild(DynamicDirective, {static: true}) dynamicHost: DynamicDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    for(let item of this.data.children) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<DynamicComponent>componentRef.instance).data = item.data;
    }
  }
}
