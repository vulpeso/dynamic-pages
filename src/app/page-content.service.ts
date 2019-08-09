import { Injectable, Type } from '@angular/core';
import { DynamicItem } from './dynamic-item';
import { HeaderComponent } from './dynamic-components/header.component';
import { HeroComponent } from './dynamic-components/hero.component';
import { ContentWrapperComponent } from './dynamic-components/content-wrapper.component';
import { PartialHtmlComponent } from './dynamic-components/partial-html.component';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

const jsonContent = {
  data: [
    { 
      type: 'header-component',
      content: {
        items: [
          {
            name: 'About us',
            link: '#',
          },
          {
            name: 'Services',
            link: '#',
          },
          {
            name: 'Products',
            link: '#',
          },
          {
            name: 'Contact',
            link: '#',
          },
        ]
      }
    },
    { 
      type: 'hero-component',
      content: {
        title: "Live your life"
      }
    },
    {
      type: 'content-wrapper-component',
      children: [
        { 
          type: 'partial-html-component',
          content: {
            html: "<h2>Chapter 1</h2>"
          }
        },
        { 
          type: 'partial-html-component',
          content: {
            html: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et sapien sapien. Aenean consectetur, erat ac malesuada malesuada, odio eros convallis velit, vel tempor orci orci sit amet sapien. Integer scelerisque, nisi ac porttitor semper, ipsum sem porta orci, ac consectetur quam lectus vitae lacus. Morbi ac felis mattis lectus pharetra tristique in ut est. Vestibulum leo mi, pharetra a posuere ut, cursus non lectus. Vestibulum justo quam, tempor ut sagittis non, tempor nec est. Phasellus luctus augue a lacinia pharetra.</p>"
          }
        },
        { 
          type: 'partial-html-component',
          content: {
            html: "<h2>Chapter 2</h2>"
          }
        },
        { 
          type: 'partial-html-component',
          content: {
            html: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et sapien sapien. Aenean consectetur, erat ac malesuada malesuada, odio eros convallis velit, vel tempor orci orci sit amet sapien. Integer scelerisque, nisi ac porttitor semper, ipsum sem porta orci, ac consectetur quam lectus vitae lacus. Morbi ac felis mattis lectus pharetra tristique in ut est. Vestibulum leo mi, pharetra a posuere ut, cursus non lectus. Vestibulum justo quam, tempor ut sagittis non, tempor nec est. Phasellus luctus augue a lacinia pharetra.</p>"
          }
        },
      ]
    }
  ]
};

@Injectable()
export class PageContentService {

  typeMap: Record<string, Type<any>> = {
    'header-component': HeaderComponent,
    'hero-component': HeroComponent,
    'content-wrapper-component': ContentWrapperComponent,
    'partial-html-component': PartialHtmlComponent,
  }

  parseNode(node: any) {
    const { type, ...rest } = node;
    const parsedRest = 'children' in rest
      ? { ...rest, children: rest.children.map(n => this.parseNode(n)) }
      : rest;
    
    return new DynamicItem(this.typeMap[type], parsedRest);
  }

  getPageContent() {
    return of(jsonContent).pipe(
      delay(1000),
      map(j => j.data.map(n => this.parseNode(n)))
    );
  }

}
