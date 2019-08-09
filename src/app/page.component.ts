import { Component, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { DynamicDirective } from './dynamic.directive';
import { DynamicItem }      from './dynamic-item';
import { DynamicComponent } from './dynamic.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page',
  template: `<ng-template dynamic-host></ng-template>`
})
export class PageComponent {
  @Input() set items(items$: Observable<DynamicItem[]>) {
    items$.subscribe(items => {
      this.loadComponent(items);
    });
  }
  @ViewChild(DynamicDirective, {static: true}) dynamicHost: DynamicDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  loadComponent(items) {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    for(let item of items) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<DynamicComponent>componentRef.instance).data = item.data;
    }
  }

}
