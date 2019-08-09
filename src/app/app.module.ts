import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PageContentService } from './page-content.service';
import { PageComponent } from './page.component';
import { DynamicDirective } from './dynamic.directive';
import { ContentWrapperComponent } from './dynamic-components/content-wrapper.component';
import { HeaderComponent } from './dynamic-components/header.component';
import { HeroComponent } from './dynamic-components/hero.component';
import { PartialHtmlComponent } from './dynamic-components/partial-html.component';

@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' })],
  providers: [PageContentService],
  declarations: [
    AppComponent,
    PageComponent,
    DynamicDirective,
    ContentWrapperComponent,
    HeaderComponent,
    HeroComponent,
    PartialHtmlComponent,
  ],
  entryComponents: [
    ContentWrapperComponent,
    HeaderComponent,
    HeroComponent,
    PartialHtmlComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {}
}
