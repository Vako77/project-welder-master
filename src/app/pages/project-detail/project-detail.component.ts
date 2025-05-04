import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProjectDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  projectId: number | null = null;
  projectDetails: any = {};
  activeImage: string = '';
  isModalOpen: boolean = false;
  currentImageIndex: number = 0;
  showScrollButtons: boolean = false;
  isScrollStart: boolean = true;
  isScrollEnd: boolean = false;
  isMobile: boolean = false;

  @ViewChild('thumbnailContainer') thumbnailContainer!: ElementRef;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = +id;
        this.loadProjectDetails();
      } else {
        this.router.navigate(['/projects']);
      }
    });

    this.checkScreenSize();
  }

  ngAfterViewInit(): void {
    // Removed checkScrollPosition
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjectDetails(): void {
    // Mock data - replace with API call in production
    const projects = [
      {
        id: 1,
        companyName: 'InOffice',
        location: 'მერაბ კოსტავას ქუჩა, თბილისი',
        year: '2023',
        date: '2 წელი',
        area: '650 კვ.მ',
        completionYear: '2024',
        description: '"In Office" პროექტი განხორციელდა მერაბ კოსტავას ქუჩაზე. პროექტის მთავარი ამოცანა იყო თანამედროვე და კომფორტული სამუშაო სივრცის შექმნა, რომელიც უზრუნველყოფს პროდუქტიულობას და თანამშრომლების კეთილდღეობას. დიზაინში გამოყენებულია ღია სივრცე და ბუნებრივი განათება.',
        imageUrl: 'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
        images: [
          'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-4.jpg',
          'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-5.jpg',
          'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-6.jpg',
          'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-7.jpg',
          'https://www.officelovin.com/wp-content/uploads/2021/11/infor-office-england-8.jpg',
        ]
      },
    ];

    this.projectDetails = projects.find(project => project.id === this.projectId) || {};

    if (!this.projectDetails.id) {
      this.router.navigate(['/projects']);
      return;
    }

    this.activeImage = this.projectDetails.images?.[0] || '';
    this.updateMetaTags();
  }

  setActiveImage(image: string): void {
    this.activeImage = image;
    this.currentImageIndex = this.projectDetails.images.indexOf(image);
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  setModalImage(index: number): void {
    if (this.projectDetails.images?.length && index >= 0 && index < this.projectDetails.images.length) {
      this.currentImageIndex = index;
      this.activeImage = this.projectDetails.images[this.currentImageIndex];
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }

  nextImage(): void {
    if (this.projectDetails.images?.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.projectDetails.images.length;
      this.activeImage = this.projectDetails.images[this.currentImageIndex];
    }
  }

  prevImage(): void {
    if (this.projectDetails.images?.length > 1) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.projectDetails.images.length) % this.projectDetails.images.length;
      this.activeImage = this.projectDetails.images[this.currentImageIndex];
    }
  }

  // Removed scrollThumbnails function - using only natural scrolling

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  updateMetaTags(): void {
    this.translateService.get('project_detail.page_title', { company: this.projectDetails.companyName })
      .pipe(takeUntil(this.destroy$))
      .subscribe(title => {
        this.titleService.setTitle(title);
      });

    const description = `${this.projectDetails.companyName} - ${this.projectDetails.location} - ${this.projectDetails.date}`;

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: this.projectDetails.companyName });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: this.projectDetails.imageUrl });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.isModalOpen) {
      if (event.key === 'ArrowRight') {
        this.nextImage();
      } else if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'Escape') {
        this.closeModal();
      }
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }
}