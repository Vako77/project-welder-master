import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss'],
})
export class CardSectionComponent implements AfterViewInit {
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;

  welderSkills = [
    { title: 'აღჭურვილობა', description: 'ჩვენ ვიყენებთ თანამედროვე და პროფესიონალური დონის ინსტრუმენტებს', icon: 'fas fa-tools' },
    { title: 'სუფთა შედუღება', description: 'ჩვენი სპეციალისტები უზრუნველყოფენ დეტალურ და სუფთა შედუღებას', icon: 'fas fa-wrench' },
    { title: 'უსაფრთხოება', description: 'შედუღების პროცესი მიმდინარეობს მაქსიმალური უსაფრთხოების დაცვით, ვიყენებთ დამცავ აქსესუარებს.', icon: 'fas fa-hard-hat' }
  ];

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
