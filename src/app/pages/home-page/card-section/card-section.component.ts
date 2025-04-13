<<<<<<< HEAD
// Angular-ის საჭირო კომპონენტების და დეკორატორების იმპორტი
import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
// ანიმაციის სერვისის იმპორტი, რომელიც მართავს ელემენტების ანიმაციებს სქროლისას
import { CardAnimationService } from '../../../services/card-animation.service';

// @Component დეკორატორი აღნიშნავს, რომ ეს კლასი არის Angular კომპონენტი
@Component({
  selector: 'app-card-section', // HTML ტეგი, რომლითაც გამოიძახებთ ამ კომპონენტს
  templateUrl: './card-section.component.html', // HTML შაბლონის ფაილის მისამართი
  styleUrls: ['./card-section.component.scss'], // CSS სტილების ფაილის მისამართი
})
export class CardSectionComponent implements AfterViewInit {
  // @ViewChildren დეკორატორი პოულობს ყველა ელემენტს, რომელსაც შაბლონში აქვს #skillCard რეფერენსი
  // QueryList<ElementRef> არის ამ ელემენტების კოლექცია
  // '!' ნიშანი მიუთითებს TypeScript-ს, რომ ეს ცვლადი აუცილებლად იქნება ინიციალიზებული
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;

  // მონაცემები შემდუღებლის უნარების შესახებ - გამოიყენება შაბლონში ბარათების შესაქმნელად
=======
import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss'],
})
export class CardSectionComponent implements AfterViewInit {
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;

>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
  welderSkills = [
    { title: 'აღჭურვილობა', description: 'ჩვენ ვიყენებთ თანამედროვე და პროფესიონალური დონის ინსტრუმენტებს', icon: 'fas fa-tools' },
    { title: 'სუფთა შედუღება', description: 'ჩვენი სპეციალისტები უზრუნველყოფენ დეტალურ და სუფთა შედუღებას', icon: 'fas fa-wrench' },
    { title: 'უსაფრთხოება', description: 'შედუღების პროცესი მიმდინარეობს მაქსიმალური უსაფრთხოების დაცვით, ვიყენებთ დამცავ აქსესუარებს.', icon: 'fas fa-hard-hat' }
  ];
<<<<<<< HEAD
  
  // კონსტრუქტორი - CardAnimationService-ის ინექცია გვჭირდება ანიმაციების სამართავად
  constructor(private cardAnimationService: CardAnimationService) { }
  
  // ngAfterViewInit() გამოიძახება, როდესაც კომპონენტის ხედი სრულად ჩაიტვირთება
  ngAfterViewInit(): void {
    // გადავუყვებით ყველა ბარათს და ვააქტიურებთ მათზე ანიმაციას
    this.skillCards.forEach(card => {
      // თითოეული ბარათისთვის ვიყენებთ CardAnimationService-ის მეთოდს
      // 'show' არის CSS კლასი, რომელიც დაემატება ელემენტს, როცა ის გამოჩნდება ეკრანზე
      this.cardAnimationService.observeElement(card, 'show');
    });
  }
}
=======

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show'); // .show კლასის დამატება
          }
        });
      },
      { threshold: 0.2 }
    );

    this.skillCards.forEach(card => observer.observe(card.nativeElement));
  }
}
>>>>>>> 492d8396115050279475f0fcf43fc2adc3fdabf3
