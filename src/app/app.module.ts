import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Main Components
import { AppComponent } from './app.component';
import { CardSectionComponent } from './pages/home-page/card-section/card-section.component';
import { MainContactNavigationComponent } from './main-contact-navigation/main-contact-navigation.component';
import { FooterComponent } from './footer/footer.component';

// Main Page Components
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeMainSectionComponent } from './pages/home-page/home-main-section/home-main-section.component';
import { HomeInformationSectionComponent } from './pages/home-page/home-information-section/home-information-section.component';
import { HomeInformationSecondSectionComponent } from './pages/home-page/home-information-second-section/home-information-second-section.component';

// Other Pages
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BigProjectsComponent } from './pages/projects/big-projects/big-projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectCardComponent } from './pages/projects/project-card/project-card.component';

// @ngx-translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaginationComponent } from './pagination/pagination.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CardSectionComponent,
    MainContactNavigationComponent,
    FooterComponent,
    HomePageComponent,
    HomeMainSectionComponent,
    HomeInformationSectionComponent,
    HomeInformationSecondSectionComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    BigProjectsComponent,
    ProjectDetailComponent,
    ProjectCardComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ka', // Changed to 'ka' to match component config
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
