import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationService } from '../../../services/animation.service';

@Component({
  selector: 'app-home-information-section',
  templateUrl: './home-information-section.component.html',
  styleUrls: ['./home-information-section.component.scss']
})
export class HomeInformationSectionComponent implements OnInit, AfterViewInit {

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    // Initial setup
  }

  ngAfterViewInit(): void {
    // Ensure elements are ready in the DOM
    const elements = document.querySelectorAll('.main-home-information-section-container-box, .main-home-information-section-text, .main-home-information-section-image') as NodeListOf<HTMLElement>;
    this.animationService.initScrollAnimations(Array.from(elements));
  }
}
