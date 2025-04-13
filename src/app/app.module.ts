import { NgModule } from '@angular/core'; // Angular-ის მოდულის დეკორატორი
import { BrowserModule } from '@angular/platform-browser'; // ბრაუზერზე გასაშვებად საჭირო მოდული

import { AppRoutingModule } from './app-routing.module'; // მარშრუტიზაციის მოდული
import { AppComponent } from './app.component'; // მთავარი კომპონენტი
import { NavbarComponent } from './navbar/navbar.component'; // ნავიგაციის ზოლის კომპონენტი
import { CardSectionComponent } from './pages/home-page/card-section/card-section.component'; // ბარათების სექციის კომპონენტი
import { MainContactNavigationComponent } from './main-contact-navigation/main-contact-navigation.component'; // კონტაქტის ნავიგაციის კომპონენტი
import { FooterComponent } from './footer/footer.component'; // ვებგვერდის ძირის კომპონენტი

import { HomePageComponent } from './pages/home-page/home-page.component'; // მთავარი გვერდის კომპონენტი
import { HomeMainSectionComponent } from './pages/home-page/home-main-section/home-main-section.component'; // მთავარი გვერდის ძირითადი სექცია
import { HomeInformationSectionComponent } from './pages/home-page/home-information-section/home-information-section.component'; // მთავარი გვერდის ინფორმაციის სექცია
import { HomeInformationSecondSectionComponent } from './pages/home-page/home-information-second-section/home-information-second-section.component'; // მთავარი გვერდის მეორე ინფორმაციის სექცია

import { AboutComponent } from './pages/about/about.component'; // შესახებ გვერდის კომპონენტი
import { ProjectsComponent } from './pages/projects/projects.component'; // პროექტების გვერდის კომპონენტი
import { ContactComponent } from './pages/contact/contact.component'; // კონტაქტის გვერდის კომპონენტი
import { FormsModule } from '@angular/forms';
import { BigProjectsComponent } from './pages/projects/big-projects/big-projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

@NgModule({
  declarations: [
    // აქ ჩამოთვლილია ყველა კომპონენტი, რომელიც ამ მოდულში გამოიყენება
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
    BigProjectsComponent,
    ProjectDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule], // აქ ჩამოთვლილია მოდულები, რომლებსაც იმპორტირებას ვუკეთებთ
  providers: [], // სერვისები, რომელთა მიწოდებაც გვინდა აპლიკაციისთვის
  bootstrap: [AppComponent], // საწყისი კომპონენტი, რომლითაც აპლიკაცია იწყებს მუშაობას
})
export class AppModule {}