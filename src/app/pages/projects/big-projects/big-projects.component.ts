import { Component } from '@angular/core';

@Component({
  selector: 'app-big-projects',
  templateUrl: './big-projects.component.html',
  styleUrls: ['./big-projects.component.scss']
})
export class BigProjectsComponent {
  projects = [
    { id: 1, companyName: 'In Office', imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg' },
    { id: 2, companyName: 'Axis Towers', imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg' },
    { id: 3, companyName: 'InOffice', imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg' },
    { id: 4, companyName: 'InOffice', imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg' },
    { id: 5, companyName: 'InOffice', imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg' },
    { id: 6, companyName: 'InOffice', imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg' }
  ];
}
