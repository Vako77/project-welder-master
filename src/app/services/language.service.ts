// language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private supportedLanguages = ['ka', 'ru', 'en'];
  private languageSubject = new BehaviorSubject<string>('ka');
  public currentLanguage$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
    // Set default fallback language
    this.translate.setDefaultLang('ka');
    
    // Try to load from localStorage first
    const savedLang = localStorage.getItem('preferred-language');
    
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      this.setLanguage(savedLang);
    } else {
      // Otherwise use browser language or default
      const browserLang = navigator.language.split('-')[0];
      const langToUse = this.supportedLanguages.includes(browserLang) ? browserLang : 'ka';
      this.setLanguage(langToUse);
    }
  }

  public setLanguage(lang: string): void {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} is not supported. Using default.`);
      lang = 'ka';
    }
    
    // Update translation service
    this.translate.use(lang);
    
    // Store in localStorage
    localStorage.setItem('preferred-language', lang);
    
    // Update our subject
    this.languageSubject.next(lang);
  }

  public getSupportedLanguages(): string[] {
    return [...this.supportedLanguages];
  }
}