// Angular-ს Injectable დეკორატორის გამოყენება
// იმისთვის, რომ სერვისი იყოს ხელმისაწვდომი მთელ აპლიკაციაში (root level)
import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root', // ეს საშუალებას გვაძლევს რომ სერვისი შევძლოთ ჩავრთოთ ნებისმიერ კომპონენტში
})
export class CardAnimationService {
  constructor() {} // კონსტრუქტორი ცარიელია, რადგან ამ სერვისში არ არის დამატებითი dependencies

  // observeElement მეთოდი – რომელიც დააკვირდება ელემენტს და დაამატებს ანიმაციას
  observeElement(element: ElementRef, animationClass: string = 'show'): void {
    // IntersectionObserver - API, რომელიც შესაძლებლობას გვაძლევს გავიგოთ
    // როცა ელემენტი ეკრანზე გამოჩნდება (scroll-ით)
    const observer = new IntersectionObserver(
      (entries) => {
        // გადმოცემული მონაცემები, რაც დაკავშირებულია ელემენტის სტატუსთან (ჩნდება/გაქრება ეკრანზე)
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // თუ ელემენტი ეკრანზე გამოჩნდა
            entry.target.classList.add(animationClass); // დავამატოთ ანიმაციის კლასი
            observer.unobserve(entry.target); // გავჩერდეთ დაკვირვება, რადგან ანიმაცია ერთხელ იმუშავებს
          }
        });
      },
      { threshold: 0.1 } // თუ ელემენტის 40%-ზე მეტი გამოჩნდა ეკრანზე, ვთვლით რომ გამოჩნდა
    );

    // დავიწყოთ დაკვირვება ამ ელემენტზე
    observer.observe(element.nativeElement);
  }
}
