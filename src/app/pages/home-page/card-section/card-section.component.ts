import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

// @Component დეკორატორი აღნიშნავს, რომ ეს კლასი არის Angular კომპონენტი
@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss'],
})
export class CardSectionComponent implements AfterViewInit {
  // @ViewChildren დეკორატორი პოულობს ყველა ელემენტს, რომელსაც შაბლონში აქვს #skillCard რეფერენსი
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;

  // // მონაცემები შემდუღებლის უნარების შესახებ - გამოიყენება შაბლონში ბარათების შესაქმნელად
  // welderSkills = [
  //   { title: 'აღჭურვილობა', description: 'ჩვენ ვიყენებთ პროფესიონალური დონის ინსტრუმენტებს', icon: 'fas fa-tools' },
  //   { title: 'სუფთა შედუღება', description: 'ჩვენი სპეციალისტები უზრუნველყოფენ დეტალურ და სუფთა შედუღებას', icon: 'fas fa-wrench' },
  //   { title: 'უსაფრთხოება', description: 'შედუღების პროცესი მიმდინარეობს მაქსიმალური უსაფრთხოების დაცვით, ვიყენებთ დამცავ აქსესუარებს.', icon: 'fas fa-hard-hat' }
  // ];

  skills = [
    { title: 'equipment', icon: 'fas fa-tools' },
    { title: 'clean_welding', icon: 'fas fa-wrench' },
    { title: 'safety', icon: 'fas fa-hard-hat' },
  ];

  constructor() {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show'); // .show კლასის დამატება
          }
        });
      },
      { threshold: 0.2 }
    );

    this.skillCards.forEach((card) => observer.observe(card.nativeElement));
  }
}
