import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

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
export class ProjectCardComponent implements OnInit, OnDestroy {
  readonly projectsPerPage: number = 30;
  readonly maxPaginationButtons: number = 5;

  allProjects: Project[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  displayedProjects: Project[] = [];

  selectedProject: Project | null = null;
  currentImageIndex: number = 0;

  ngOnInit(): void {
    this.loadProjects();
    this.calculatePagination();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }

  openModal(project: Project): void {
    this.selectedProject = project;
    this.currentImageIndex = 0;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  nextImage(): void {
    if (this.selectedProject && this.currentImageIndex < this.selectedProject.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  selectThumbnail(index: number): void {
    if (this.selectedProject && index >= 0 && index < this.selectedProject.images.length) {
      this.currentImageIndex = index;
    }
  }

  calculatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.allProjects.length / this.projectsPerPage));
    this.updateDisplayedProjects();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedProjects();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateDisplayedProjects(): void {
    const start = (this.currentPage - 1) * this.projectsPerPage;
    const end = Math.min(start + this.projectsPerPage, this.allProjects.length);
    this.displayedProjects = this.allProjects.slice(start, end);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.selectedProject) {
      if (event.key === 'ArrowRight') this.nextImage();
      else if (event.key === 'ArrowLeft') this.prevImage();
      else if (event.key === 'Escape') this.closeModal();
    }
  }

  private loadProjects(): void {
    this.allProjects = [
      {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      }, {
        id: 1,
        name: 'რკინის კიბეები',
        description: 'კიბეების აღწერა',
        images: [
          'https://proservisi.ge/files/products/UY7ZHImoQl98jfxoc2PTaXIJm9mXjl.jpg',
          'https://handcraftedirondoors.com/wp-content/uploads/2021/07/IMG_3612-scaled.jpg',
          'https://preciseirondoors.com/wp-content/uploads/2021/02/marcelle-6181.jpg',
        ],
      },
      // Add other projects here
    ];
  }
}