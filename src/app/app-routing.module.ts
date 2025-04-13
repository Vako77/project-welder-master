import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
<<<<<<< HEAD
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },  // მთავარი გვერდი
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },  // პროექტების გვერდი
  { path: 'contact', component: ContactComponent },
  { path: 'project/:id', component: ProjectDetailComponent }  // პროექტის დეტალების გვერდი
];

=======

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
];


>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
