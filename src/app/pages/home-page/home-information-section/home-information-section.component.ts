// Angular-ის საჭირო ბიბლიოთეკების იმპორტი
import { Component, OnInit, AfterViewInit } from '@angular/core';
// AnimationService - სერვისი, რომელიც负责 ანიმაციების გაშვებას
import { AnimationService } from '../../../services/animation.service';

// კომპონენტის დეკორატორი
@Component({
  selector: 'app-home-information-section', // კომპონენტის HTML-ში გამოყენების სახელწოდება
  templateUrl: './home-information-section.component.html', // კომპონენტის HTML ფაილი
  styleUrls: ['./home-information-section.component.scss'] // კომპონენტის სტილები
})
export class HomeInformationSectionComponent implements OnInit, AfterViewInit {

  // კონსტრუქტორი, სადაც ინიცირებულ ხდება AnimationService
  constructor(private animationService: AnimationService) {}

  // ngOnInit მეთოდი - Angular-ის lifecycle hook, რომელიც გაშვდება კომპონენტის ჩატვირთვისას
  ngOnInit(): void {
    // შეიძლება გაკეთდეს ნებისმიერი დასაწყისი ინიციალიზაცია
  }

  // ngAfterViewInit მეთოდი - Angular-ის lifecycle hook, რომელიც გაშვდება HTML კომპონენტის სრული რენდერის შემდეგ
  ngAfterViewInit(): void {
    // ვიღებთ ყველა იმ ელემენტს, რომელთა ამომვლელობაზე ვაპირებთ ანიმაციის დაწყებას
    const elements = document.querySelectorAll(
      '.main-home-information-section-container-box, .main-home-information-section-text, .main-home-information-section-image'
    ) as NodeListOf<HTMLElement>;

    // სერვისის მეთოდის გამოძახება, რომელიც მიიღებს ელემენტებს და დაიწყებს ანიმაციებს
    this.animationService.initScrollAnimations(Array.from(elements));
  }
}
