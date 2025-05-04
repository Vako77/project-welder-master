import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';

// პროექტის ინტერფეისი - ტიპების უკეთესი მართვისთვის
interface Project {
  id: number;
  name: string;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit, OnDestroy, AfterViewInit {
  // კონფიგურაციული პარამეტრები
  readonly projectsPerPage: number = 30;
  readonly maxPaginationButtons: number = 5; // პაგინაციის ღილაკების მაქსიმალური რაოდენობა

  allProjects: Project[] = []; // პროექტების მასივი
  currentPage: number = 1;
  totalPages: number = 1;
  displayedProjects: Project[] = [];

  @ViewChildren('slider') sliders!: QueryList<ElementRef<HTMLElement>>;
  private observer: ResizeObserver | null = null;

  selectedProject: Project | null = null;
  currentImageIndex: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProjects();
    this.calculatePagination();
  }

  ngAfterViewInit(): void {
    this.initResizeObserver();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.disconnectObserver();
  }

  // პროექტის ID-ით რეფერენსის შესანარჩუნებლად ngFor-ისთვის
  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }

  // პაგინაციის მასივის გენერაცია დინამიური ღილაკებისთვის
  getPaginationArray(): number[] {
    const pages: number[] = [];

    if (this.totalPages <= this.maxPaginationButtons) {
      // თუ გვერდების რაოდენობა ნაკლებია მაქსიმუმზე, ყველა გვერდს ვაჩვენებთ
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // დინამიური პაგინაცია დიდი რაოდენობით გვერდებისთვის
      const halfMax = Math.floor(this.maxPaginationButtons / 2);

      let startPage = Math.max(1, this.currentPage - halfMax);
      let endPage = Math.min(
        this.totalPages,
        startPage + this.maxPaginationButtons - 1
      );

      // თუ ბოლო გვერდის ინდექსი მაქსიმუმს აღემატება, უკან დავწიოთ საწყისი
      if (endPage - startPage + 1 < this.maxPaginationButtons) {
        startPage = Math.max(1, endPage - this.maxPaginationButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  // მოდალის გარეთ დაკლიკებით დახურვა
  handleModalBackdropClick(event: MouseEvent): void {
    // თუ დაკლიკებული ელემენტი თვითონ მოდალია (და არა მისი შიდა კონტენტი)
    if ((event.target as HTMLElement).className === 'modal') {
      this.closeModal();
    }
  }

  // ResizeObserver-ის გათიშვა
  private disconnectObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  // ResizeObserver-ის ინიციალიზაცია
  private initResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver((entries) => {
        if (entries.length) {
          this.updateSliderWidths();
        }
      });

      this.sliders?.forEach((slider) => {
        if (slider.nativeElement) {
          this.observer?.observe(slider.nativeElement);
        }
      });
    }
  }

  // სლაიდერის სიგანეების განახლება
  updateSliderWidths(): void {
    // აქ შეგიძლიათ დაამატოთ სლაიდერის სიგანესთან დაკავშირებული ლოგიკა
    this.cdr.detectChanges();
  }

  // მოდალის გახსნა
  openModal(project: Project): void {
    this.selectedProject = project;
    this.currentImageIndex = 0;
    document.body.style.overflow = 'hidden'; // body-ს სქროლის გათიშვა
  }

  // მოდალის დახურვა
  closeModal(): void {
    this.selectedProject = null;
    document.body.style.overflow = ''; // body-ს სქროლის აღდგენა
  }

  // შემდეგ სურათზე გადასვლა
  nextImage(): void {
    if (
      this.selectedProject?.images.length &&
      this.currentImageIndex < this.selectedProject.images.length - 1
    ) {
      this.currentImageIndex++;
    }
  }

  // წინა სურათზე გადასვლა
  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  // თამბნეილის არჩევა
  selectThumbnail(index: number): void {
    if (
      index >= 0 &&
      this.selectedProject &&
      index < this.selectedProject.images.length
    ) {
      this.currentImageIndex = index;
    }
  }

  // პაგინაციის გამოთვლა
  calculatePagination(): void {
    this.totalPages = Math.max(
      1,
      Math.ceil(this.allProjects.length / this.projectsPerPage)
    );
    this.updateDisplayedProjects();
  }

  // გვერდის შეცვლა
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProjects();
      // დამატებითი სქროლის ფუნქციონალობა გვერდის თავში დასაბრუნებლად
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // გამოსაჩენი პროექტების განახლება
  updateDisplayedProjects(): void {
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = Math.min(
      startIndex + this.projectsPerPage,
      this.allProjects.length
    );
    this.displayedProjects = this.allProjects.slice(startIndex, endIndex);
  }

  // კლავიატურა ღილაკების მართვა მოდალში ნავიგაციისთვის
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.selectedProject) {
      switch (event.key) {
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'ArrowLeft':
          this.prevImage();
          break;
        case 'Escape':
          this.closeModal();
          break;
      }
    }
  }

  // პროექტების ჩატვირთვა
  private loadProjects(): void {
    this.allProjects = [
      { id: 1, name: 'რკინის კიბეები', description: 'კიბეების აღწერა', images: ['https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg', 'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg', 'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg'] },
      { id: 2, name: 'რკინის კარები', description: 'კარების აღწერა', images: ['https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg', 'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg', 'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg'] },
      { id: 3, name: 'რკინის ჭიშკარი', description: 'ჭიშკრის აღწერა', images: ['https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg', 'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg', 'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg'] },
      { id: 4, name: 'რკინის კარები', description: 'კარების აღწერა', images: ['https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg', 'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg', 'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg'] },
      { id: 5, name: 'რკინის კარები', description: 'კარების აღწერა', images: ['https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg', 'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg', 'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg'] },
      { id: 6, name: 'რკინის კარები', description: 'კარების აღწერა', images: ['https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg', 'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg', 'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg'] },
      { id: 7, name: 'რკინის კარები', description: 'კარების აღწერა', images: ['https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg', 'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg', 'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg'] },
      { id: 8, name: 'რკინის კარები', description: 'კარების აღწერა', images: ['https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg', 'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg', 'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg'] },
     

    ];    
  }
}
