import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  // პროექტის ID-ს ცვლადი, რომელიც დაინიციალიზდება URL-დან
  projectId: number | null = null;

  // პროექტის დეტალების შენახვა. ამ ცვლადში ინახება შესაბამისი პროექტის მონაცემები.
  projectDetails: any = {};

  // აქტიური სურათი, რომელიც პირველადი იქნება. ინახავს იმ სურათს, რომელიც გახსნისას გამოჩნდება.
  activeImage: string = '';

  // სტრიქონი იმის შესახებ, თუ მოდალი ღიაა თუ არა
  isModalOpen: boolean = false;

  // სურათების მასივში მიმდინარე აქტიური სურათის ინდექსი.
  currentImageIndex: number = 0;

  // პროექტების მაგალითი — იდენტიფიცირებული სხვადასხვა პროექტები, რომლებსაც later შეიძლება API-დან მოიტანს.
  projects = [
    {
      id: 1,
      companyName: 'In Office',
      imageUrl:
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
      description: '“In Office” პროექტი განხორციელდა მერაბ კოსტავას ქუჩაზე...',
      images: [
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-5.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-6.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-7.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-8.jpg',
      ],
    },
    {
      id: 2,
      companyName: 'Axis Towers',
      imageUrl:
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
      description: 'Axis Towers project description goes here...',
      images: [
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-5.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-6.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-7.jpg',
        'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-8.jpg',
      ],
    },
  ];

  // constructor-ში ვიყენებთ ActivatedRoute-ს, რათა URL-დან წამოვიღოთ ID
  constructor(private route: ActivatedRoute) {}

  // კომპონენტის ინიციალიზაციისას, როდესაც კომპონენტი პირველად იტვირთება
  ngOnInit(): void {
    // ვიღებთ პროექტის ID-ს URL-დან
    this.projectId = +this.route.snapshot.paramMap.get('id')!;

    // ვპოულობთ შესაბამის პროექტს ID-ს მიხედვით
    // find მეთოდი იძენს პირველ შესაბამის პროექტს, თუ არ მოიძებნა, აბრუნებს ცარიელს {}
    this.projectDetails =
      this.projects.find((project) => project.id === this.projectId) || {};

    // ვიღებთ პირველ სურათს და ვასიგნებთ activeImage-ს
    this.activeImage = this.projectDetails.images?.[0] || '';
  }

  // ეს მეთოდი განაახლებს activeImage-ს და ხსნის მოდალს
  setActiveImage(image: string): void {
    // ვანიჭებთ ახალ აქტიურ სურათს, რომელიც იქნა დაჭერილი
    this.activeImage = image;
    // ვაანიჭებთ სურათის ინდექსს
    this.currentImageIndex = this.projectDetails.images.indexOf(image);
    // ვხსნით მოდალს, რადგან სურათი ჩატვირთა
    this.isModalOpen = true;
  }

  // ეს მეთოდი ხურავს მოდალს
  closeModal(): void {
    // მოდალის დახურვა
    this.isModalOpen = false;
  }

  // გადადის შემდეგ სურათზე გალერეაში
  nextImage(): void {
    if (this.projectDetails.images?.length) {
      // თუ სურათების მასივი არ არის ცარიელი, ამოირჩევა შემდეგი სურათი
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.projectDetails.images.length;
      // ვაწინასწარმეტყველებთ აქტიურ სურათს
      this.activeImage = this.projectDetails.images[this.currentImageIndex];
    }
  }

  // გადადის წინა სურათზე გალერეაში
  prevImage(): void {
    if (this.projectDetails.images?.length) {
      // თუ სურათების მასივი არ არის ცარიელი, ამოირჩევა წინა სურათი
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.projectDetails.images.length) %
        this.projectDetails.images.length;
      // ვაწინასწარმეტყველებთ აქტიურ სურათს
      this.activeImage = this.projectDetails.images[this.currentImageIndex];
    }
  }

  // კლავიატურის დანიშნულებები: გადაადგილება სურათებზე ისარებით
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // მხოლოდ იმ შემთხვევაში, თუ მოდალი ღიაა, მართვა შესაძლებელია
    if (this.isModalOpen) {
      if (event.key === 'ArrowRight') {
        // მარჯვენა ისარის შემთხვევაში გადავდივართ შემდეგ სურათზე
        this.nextImage();
      } else if (event.key === 'ArrowLeft') {
        // მარცხენა ისარის შემთხვევაში გადავდივართ წინა სურათზე
        this.prevImage();
      } else if (event.key === 'Escape') {
        // "Esc" კლავიშის შემთხვევაში მოდალი დაიხურება
        this.closeModal();
      }
    }
  }
}
