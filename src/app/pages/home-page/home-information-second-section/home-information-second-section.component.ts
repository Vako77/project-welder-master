<<<<<<< HEAD
// საჭირო Angular-ს ბიბლიოთეკების იმპორტი
import { Component, OnInit, AfterViewInit } from '@angular/core';

// AnimationService - შენი სერვისი ანიმაციებისთვის
=======
import { Component, OnInit, AfterViewInit } from '@angular/core';
>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
import { AnimationService } from '../../../services/animation.service';

@Component({
  selector: 'app-home-information-second-section',
<<<<<<< HEAD
  // ამ კომპონენტის გამოყენება HTML-ში ხდება ასე: 
  // <app-home-information-second-section></app-home-information-second-section>

  templateUrl: './home-information-second-section.component.html',
  // Angular-ს ეუბნება სად არის HTML ფაილი ამ კომპონენტისთვის

  styleUrls: ['./home-information-second-section.component.scss']
  // Angular-ს ეუბნება სად არის CSS/SCSS სტილები ამ კომპონენტისთვის
})
export class HomeInformationSecondSectionComponent implements OnInit, AfterViewInit {

  // Constructor - სერვისის ინიექცია (Service Injection)
  // ვუთხრათ Angular-ს რომ AnimationService გვჭირდება
  constructor(private animationService: AnimationService) { }

  // OnInit - როცა კომპონენტი იტვირთება, ეს მეთოდი ავტომატურად გაეშვება
  ngOnInit(): void {
    // აქ შეგვიძლია დავწეროთ რამე ლოგიკა რაც კომპონენტის ჩატვირთვისას უნდა გაეშვას
    // ამ შემთხვევაში ცარიელია
  }

  // AfterViewInit - როცა Angular დაამთავრებს HTML-ის რენდერს (DOM მზადაა)
  ngAfterViewInit(): void {
    // ვიღებთ იმ ელემენტებს რომელთაც გვინდა ანიმაცია დავამატოთ
    const elements = document.querySelectorAll(
      '.main-home-information-second-section-container-box, .main-home-information-second-section-text, .main-home-information-second-section-image'
    ) as NodeListOf<HTMLElement>;

    // ვგზავნით ამ ელემენტებს AnimationService-ში
    // სადაც უკვე გვაქვს გაწერილი ლოგიკა რომ Scroll-ზე გამოჩნდნენ ან სხვა Animation გაუკეთდეთ
    this.animationService.initScrollAnimations(Array.from(elements));
  }
}
=======
  templateUrl: './home-information-second-section.component.html',
  styleUrls: ['./home-information-second-section.component.scss']
})
export class HomeInformationSecondSectionComponent implements OnInit, AfterViewInit {

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    // Initial setup (if needed)
  }

  ngAfterViewInit(): void {
    // Ensure elements are ready in the DOM
    const elements = document.querySelectorAll('.main-home-information-second-section-container-box, .main-home-information-second-section-text, .main-home-information-second-section-image') as NodeListOf<HTMLElement>;
    this.animationService.initScrollAnimations(Array.from(elements));
  }
}
>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
