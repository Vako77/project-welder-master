import { Injectable } from '@angular/core';

<<<<<<< HEAD
/**
 * სერვისი ანიმაციების სამართავად
 * ეს სერვისი გვეხმარება ვებ-გვერდზე სქროლის ეფექტის დროს ანიმაციების
 * გააქტიურებაში სხვადასხვა ელემენტებისთვის
 */
@Injectable({
  providedIn: 'root', // სერვისი გლობალურად იქნება ხელმისაწვდომი აპლიკაციაში
=======
@Injectable({
  providedIn: 'root',
>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
})
export class AnimationService {
  constructor() {}

<<<<<<< HEAD
  /**
   * ფუნქცია, რომელიც ამატებს ანიმაციის კლასს ელემენტზე
   * @param element HTML ელემენტი, რომელზეც უნდა გააქტიურდეს ანიმაცია
   * @param animationType ანიმაციის ტიპი/კლასის სახელი, რომელიც უნდა დაემატოს
   */
  triggerAnimation(element: HTMLElement, animationType: string): void {
=======
  // Function to add the animation classes
  triggerAnimation(element: HTMLElement, animationType: string) {
>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
    if (element) {
      element.classList.add(animationType);
    }
  }

<<<<<<< HEAD
  /**
   * აინიციალიზებს სქროლით გააქტიურებად ანიმაციებს სხვადასხვა ელემენტებისთვის
   * @param elements ელემენტების მასივი, რომლებიც უნდა დავაკვირდეთ
   */
  initScrollAnimations(elements: HTMLElement[]): void {
    // შექმნა IntersectionObserver-ის, რომელიც აკვირდება როდის გამოჩნდება ელემენტი ეკრანზე
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // თუ ელემენტი ხილვადია ეკრანზე
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // ელემენტის კლასის მიხედვით განსაზღვრავს რა ტიპის ანიმაცია გააქტიურდეს
            if (element.classList.contains('main-home-information-second-section-text')) {
              // ტექსტის ბლოკისთვის გააქტიურდება მარცხნიდან შემოსვლის ანიმაცია
              this.triggerAnimation(element, 'slideInLeft');
            } else if (element.classList.contains('main-home-information-second-section-image')) {
              // სურათის ბლოკისთვის გააქტიურდება მარჯვნიდან შემოსვლის ანიმაცია
              this.triggerAnimation(element, 'slideInRight');
            } else {
              // სხვა ყველა ელემენტისთვის გააქტიურდება ქვემოდან ამოსვლის ანიმაცია
              this.triggerAnimation(element, 'fadeInUp');
            }
            
            // ანიმაციის ერთხელ გააქტიურების შემდეგ წყვეტს ელემენტზე დაკვირვებას
=======
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

>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
            observer.unobserve(entry.target);
          }
        });
      },
<<<<<<< HEAD
      { threshold: 0.5 } // ელემენტის 50% უნდა იყოს ხილვადი ეკრანზე ანიმაციის გასააქტიურებლად
    );

    // ყველა გადაცემულ ელემენტზე იწყებს დაკვირვებას
    elements.forEach((el) => observer.observe(el));
  }
}
=======
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));
  }
}
>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
