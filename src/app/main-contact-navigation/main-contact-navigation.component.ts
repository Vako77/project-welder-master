import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-contact-navigation',
  templateUrl: './main-contact-navigation.component.html',
  styleUrls: ['./main-contact-navigation.component.scss'],
})
export class MainContactNavigationComponent implements OnInit, OnDestroy {
  menuOpen = false; // ნავბარის ღია/დახურვის მდგომარეობა
  showDropdown = false; // დროპდაუნ მენიუს გაჩენა/გადახურვა
  currentLang = 'ka'; // ჩატვირთული ენა, საწყისი ენა არის 'ka' (ქართული)
  currentFlag = 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg'; // საწყისი დროშა - საქართველოს
  isMobile = false; // მობილური ეკრანის მდგომარეობა

  private langSubscription: Subscription | null = null; // სუბსკრიპცია ენის ცვლილებისთვის
  private resizeTimeout: any; // ეკრანის ზომის ცვლილების დროის დამზღვევი

  // ენების ჩამონათვალი
  private languages = ['ka', 'ru', 'en'];
  
  // დროშების შესაბამისობა ენებთან
  private flags: { [key: string]: string } = {
    ka: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg',
    ru: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg',
    en: 'https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg',
  };

  constructor(private languageService: LanguageService) {
    // თავდაპირველი შემოწმება არის თუ არა მობილური
    this.checkIfMobile();
  }

  ngOnInit(): void {
    // გამოწერა ენის ცვლილებებისთვის
    this.langSubscription = this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLang = lang; // ენის განახლება
      this.currentFlag = this.flags[lang]; // დროშის განახლება
    });
    
    // გადამოწმება, თუ ადგილობრივ მეხსიერებაში არის შენახული ენა
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && this.flags[savedLang]) {
      this.languageService.setLanguage(savedLang); // თუ არსებობს, დაინსტალირეთ
    } else {
      this.setLanguage(this.currentLang); // თუ არ არსებობს, დადგინდება საწყისი ენა
    }
    
    // დოკუმენტის კლიკის მოსმენა დროპდაუნის დასახურად გარეთ დაკლიკებისას
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy(): void {
    // სუბსკრიპციის გაჩერება კომპონენტის განადგურებისას
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
    
    // დოკუმენტის კლიკის მოსმენის გაუქმება
    document.removeEventListener('click', this.onDocumentClick.bind(this));
    
    // ეკრანის ზომის ცვლილების მოსმენის წაშლა
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    // სხეულის ჩვეულებრივი მდგომარეობის აღდგენა
    document.body.style.overflow = '';
  }

  // ეკრანის ზომის ცვლილების მოსმენა
  @HostListener('window:resize', ['$event'])
  onResize() {
    // მცირე დაყოვნება ეკრანის ზომის ცვლილების დასასრულებისთვის
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      this.checkIfMobile();
    }, 100);
  }

  // შემოწმება არის თუ არა მობილური
  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
    
    // თუ არ არის მობილური, დავხუროთ მობილური მენიუ
    if (!this.isMobile && this.menuOpen) {
      this.closeMenu();
    }
  }

  // გარეთ დაკლიკებით დროპდაუნის დახურვა
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isDropdownClick = target.closest('.dropdown') !== null;
    const isMenuToggleClick = target.closest('.navbar-toggle') !== null;
    
    if (!isDropdownClick && !isMenuToggleClick && this.showDropdown) {
      this.closeDropdown();
    }
  }

  // Escape ღილაკით მენიუების დახურვა
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (this.menuOpen || this.showDropdown) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.showDropdown = false; // მენიუს დახურვისას დროპდაუნიც დაიხურება
    }
    
    // სხეულის გადაადგილების გათიშვა მენიუს გახსნისას
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
    
  toggleDropdown(event: Event): void {
    // დროპდაუნ მენიუს გახსნა/დახურვა
    event.stopPropagation(); // გაჩერება მენიუს დახურვის თავიდან ასაცილებლად
    this.showDropdown = !this.showDropdown;
  }

  closeMenu(): void {
    // ნავიგაციის მენიუს დახურვა
    this.menuOpen = false;
    this.showDropdown = false;
    document.body.style.overflow = ''; // გადაადგილების აღდგენა
  }

  closeDropdown(): void {
    // დროპდაუნ მენიუს დახურვა
    this.showDropdown = false;
  }

  setLanguage(lang: string): void {
    // ენის შეცვლის ფუნქცია
    this.languageService.setLanguage(lang);
    localStorage.setItem('preferred-language', lang); // ენის შენახვა
    this.currentFlag = this.flags[lang]; // დროშის განახლება
  }

  cycleLanguage(): void {
    // ენების ციკლური ცვლილების ფუნქცია (საქართველო -> რუსეთი -> ამერიკა -> საქართველო)
    const currentIndex = this.languages.indexOf(this.currentLang);
    const nextIndex = (currentIndex + 1) % this.languages.length; // შემდეგი ენის მიღება
    const nextLang = this.languages[nextIndex];
    this.setLanguage(nextLang); // ენის შეცვლა
    
    // ენის შეცვლის შემდეგ მენიუს დახურვა (არასავალდებულო)
    if (this.isMobile) {
      this.closeMenu();
    }
  }
}