import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  projectId: number | null = null;
  projectDetails: any = {};  // პროექტის დეტალები
  activeImage: string = '';  // აქტიური სურათი

  projects = [
    {
      id: 1,
      companyName: 'In Office',
      imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
      description: 'In Office project description goes here. This is a modern and efficient workspace designed for productivity.',
      images: [
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-5.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-6.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-7.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-8.jpg'
      ]
    },
    {
      id: 2,
      companyName: 'Axis Towers',
      imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
      description: 'Axis Towers project description goes here. This is another modern building designed for corporate offices.',
      images: [
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-5.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-6.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-7.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-8.jpg'
      ]
    },
    // სხვა პროექტები
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.projectDetails = this.projects.find(project => project.id === this.projectId) || {};
    // პირველი სურათი როგორც აქტიური სურათი
    this.activeImage = this.projectDetails.images[0];
  }

  // სურათის არჩევის მეთოდი
  setActiveImage(image: string): void {
    this.activeImage = image;
  }
}
