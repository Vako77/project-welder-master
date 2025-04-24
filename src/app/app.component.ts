import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    // Set the fallback language
    translate.setDefaultLang('ka');
    
    // Try to load language from localStorage first
    const savedLang = localStorage.getItem('preferred-language');
    
    if (savedLang && ['ka', 'ru', 'en'].includes(savedLang)) {
      // Use the saved language preference if available
      translate.use(savedLang);
    } else {
      // Otherwise, detect from browser
      const userLang = navigator.language.split('-')[0];
      const detectedLang = ['ka', 'ru', 'en'].includes(userLang) ? userLang : 'ka';
      
      // Save detected language to localStorage
      localStorage.setItem('preferred-language', detectedLang);
      
      // Use the detected language
      translate.use(detectedLang);
    }
  }
  
  ngOnInit(): void {
    // Additional initialization if needed
  }
}