import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { BigProjectsComponent } from './pages/projects/big-projects/big-projects.component';
import { ProjectCardComponent } from './pages/projects/project-card/project-card.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // მთავარი გვერდი
  { path: 'home', component: HomePageComponent }, // მთავარი გვერდი
  { path: 'about', component: AboutComponent }, // "ჩვენს შესახებ" გვერდი
  { path: 'projects', component: ProjectsComponent }, // პროექტების გვერდი
  { path: 'projects/big-projects', component: BigProjectsComponent }, // კომპანიის პროექტების გვერდი
  { path: 'projects/project-card', component: ProjectCardComponent }, // ინდივიდუალური ნამუშევრების გვერდი
  { path: 'contact', component: ContactComponent }, // კონტაქტის გვერდი
  { path: 'project/:id', component: ProjectDetailComponent }, // პროექტის დეტალების გვერდი
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // RouterModule კონფიგურაციის დაწყება
  exports: [RouterModule], // RouterModule-ის ექსპორტი, რომ სხვადასხვა კომპონენტებში გამოვიყენოთ
})
export class AppRoutingModule {}
