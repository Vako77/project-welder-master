import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-projects',
  templateUrl: './big-projects.component.html',
  styleUrls: ['./big-projects.component.scss'],
})
export class BigProjectsComponent implements OnInit {
  // პროექტების სრული მასივი
  allProjects = [
    {
      id: 1,
      companyName: 'In Office',
      imageUrl:
        'https://www.officerent.ge/wp-content/uploads/2019/05/1.-Inoffice_kostava_Kvernadze_Cover-min.jpg',
    },
    {
      id: 2,
      companyName: 'Axis Towers',
      imageUrl:
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
    },
    {
      id: 3,
      companyName: 'InOffice',
      imageUrl:
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
    },
    {
      id: 4,
      companyName: 'InOffice',
      imageUrl:
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
    },
    {
      id: 5,
      companyName: 'InOffice',
      imageUrl:
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
    },
    {
      id: 6,
      companyName: 'InOffice',
      imageUrl:
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
    },
  ];

  // გამოსაჩენი პროექტები (მიმდინარე გვერდზე)
  projects: { id: number; companyName: string; imageUrl: string }[] = [];

  // პაგინაციის პარამეტრები
  readonly projectsPerPage: number = 4;
  currentPage: number = 1;
  totalPages: number = 1;

  ngOnInit(): void {
    this.calculatePagination();
  }

  // პაგინაციის გამოთვლა
  calculatePagination(): void {
    this.totalPages = Math.max(
      1,
      Math.ceil(this.allProjects.length / this.projectsPerPage)
    );
    this.updateDisplayedProjects();
  }

  // გამოსაჩენი პროექტების განახლება
  updateDisplayedProjects(): void {
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = Math.min(
      startIndex + this.projectsPerPage,
      this.allProjects.length
    );
    this.projects = this.allProjects.slice(startIndex, endIndex);
  }

  // გვერდის შეცვლა
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProjects();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // პროექტის ID-ით რეფერენსის შესანარჩუნებლად ngFor-ისთვის
  trackByProjectId(index: number, project: any): number {
    return project.id;
  }
}
