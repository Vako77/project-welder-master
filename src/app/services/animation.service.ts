import { Injectable } from '@angular/core';

/**
 * სერვისი ანიმაციების სამართავად
 * ეს სერვისი გვეხმარება ვებ-გვერდზე სქროლის ეფექტის დროს ანიმაციების
 * გააქტიურებაში სხვადასხვა ელემენტებისთვის
 */
@Injectable({
  providedIn: 'root', // სერვისი გლობალურად იქნება ხელმისაწვდომი აპლიკაციაში
})
export class AnimationService {
  constructor() {}

  /**
   * ფუნქცია, რომელიც ამატებს ანიმაციის კლასს ელემენტზე
   * @param element HTML ელემენტი, რომელზეც უნდა გააქტიურდეს ანიმაცია
   * @param animationType ანიმაციის ტიპი/კლასის სახელი, რომელიც უნდა დაემატოს
   */
  triggerAnimation(element: HTMLElement, animationType: string) {
    if (element) {
      element.classList.add(animationType); // ელემენტს დაემატება ანიმაციის კლასის სახელი
    }
  }

  /**
   * აინიციალიზებს სქროლით გააქტიურებად ანიმაციებს სხვადასხვა ელემენტებისთვის
   * @param elements ელემენტების მასივი, რომლებიც უნდა დავაკვირდეთ
   */
  initScrollAnimations(elements: HTMLElement[]) {
    // IntersectionObserver-ის შექმნა, რომელიც აკვირდება ელემენტებს
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // თუ ელემენტი გამოჩნდება ეკრანზე, გააქტიურდება ანიმაცია
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;

            // ელემენტის კლასის მიხედვით განსაზღვრავს რა ტიპის ანიმაცია უნდა მოხდეს
            if (
              element.classList.contains(
                'main-home-information-second-section-text'
              )
            ) {
              // ტექსტის ბლოკისთვის slideInLeft ანიმაცია
              this.triggerAnimation(element, 'slideInLeft');
            } else if (
              element.classList.contains(
                'main-home-information-second-section-image'
              )
            ) {
              // სურათის ბლოკისთვის slideInRight ანიმაცია
              this.triggerAnimation(element, 'slideInRight');
            } else {
              // სხვა ელემენტებისთვის fadeInUp ანიმაცია
              this.triggerAnimation(element, 'fadeInUp');
            }

            // ანიმაციის ერთხელ გააქტიურდების შემდეგ წყვეტს ელემენტზე დაკვირვებას
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // ელემენტის 50% უნდა იყოს ხილვადი ეკრანზე ანიმაციის გასააქტიურებლად
    );

    // ყველა გადაცემულ ელემენტზე იწყებს დაკვირვებას
    elements.forEach((el) => observer.observe(el));
  }
}
