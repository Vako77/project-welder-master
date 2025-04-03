import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardSectionComponent } from './pages/home-page/card-section/card-section.component';
import { MainContactNavigationComponent } from './main-contact-navigation/main-contact-navigation.component';
import { FooterComponent } from './footer/footer.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeMainSectionComponent } from './pages/home-page/home-main-section/home-main-section.component';
import { HomeInformationSectionComponent } from './pages/home-page/home-information-section/home-information-section.component';
import { HomeInformationSecondSectionComponent } from './pages/home-page/home-information-second-section/home-information-second-section.component';

import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
