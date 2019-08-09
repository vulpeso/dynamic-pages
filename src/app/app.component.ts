import { Component, OnInit } from '@angular/core';

import { PageContentService } from './page-content.service';
import { DynamicItem } from './dynamic-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-page [items]="items"></app-page>
    </div>
  `
})
export class AppComponent implements OnInit {
  items: Observable<DynamicItem[]>;

  constructor(private pageContentService: PageContentService) {}

  ngOnInit() {
    this.items = this.pageContentService.getPageContent();
  }
}
