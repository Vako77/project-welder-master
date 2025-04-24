import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewChecked,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  projects = [
    {
      id: 1,
      name: 'Project One',
      images: [
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
      ],
    },
    {
      id: 2,
      name: 'Project Two',
      images: [
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
      ],
    },
    {
      id: 3,
      name: 'Project Three',
      images: [
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
      ],
    },
    {
      id: 4,
      name: 'Project four',
      images: [
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
      ],
    },
    {
      id: 5,
      name: 'Project five',
      images: [
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1019/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600',
        'https://picsum.photos/id/1015/800/600',
      ],
    },
  ];

  activeProject: any = null;
  activeImageIndex: number = 0;
  showModal: boolean = false;

  @ViewChildren('slider') sliders!: QueryList<ElementRef>;
  @ViewChildren('thumb') thumbs!: QueryList<ElementRef>;

  scrollLeft(index: number) {
    const slider = this.sliders.toArray()[index];
    if (slider) {
      slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(index: number) {
    const slider = this.sliders.toArray()[index];
    if (slider) {
      slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  openModal(project: any, imageIndex: number) {
    this.activeProject = project;
    this.activeImageIndex = imageIndex;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.activeProject = null;
    document.body.style.overflow = '';
  }

  navigateImage(direction: 'prev' | 'next') {
    if (!this.activeProject) return;
    const imagesCount = this.activeProject.images.length;

    if (direction === 'prev') {
      this.activeImageIndex =
        (this.activeImageIndex - 1 + imagesCount) % imagesCount;
    } else {
      this.activeImageIndex = (this.activeImageIndex + 1) % imagesCount;
    }
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.handleKeydown);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event: KeyboardEvent) => {
    if (!this.showModal) return;

    switch (event.key) {
      case 'ArrowLeft':
        this.navigateImage('prev');
        break;
      case 'ArrowRight':
        this.navigateImage('next');
        break;
      case 'Escape':
        this.closeModal();
        break;
    }
  };

  ngAfterViewChecked(): void {
    if (this.showModal) {
      const activeThumb = this.thumbs.toArray()[this.activeImageIndex];
      activeThumb?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  }
}
