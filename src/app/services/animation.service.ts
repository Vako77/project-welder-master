import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor() {}

  // Function to add the animation classes
  triggerAnimation(element: HTMLElement, animationType: string) {
    if (element) {
      element.classList.add(animationType);
    }
  }

  initScrollAnimations(elements: HTMLElement[]) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            if (
              element.classList.contains(
                'main-home-information-second-section-text'
              )
            ) {
              this.triggerAnimation(element, 'slideInLeft');
            } else if (
              element.classList.contains(
                'main-home-information-second-section-image'
              )
            ) {
              this.triggerAnimation(element, 'slideInRight');
            } else {
              this.triggerAnimation(element, 'fadeInUp');
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));
  }
}
