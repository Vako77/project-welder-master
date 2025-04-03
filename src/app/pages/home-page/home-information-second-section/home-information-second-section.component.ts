import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationService } from '../../../services/animation.service';

@Component({
  selector: 'app-home-information-second-section',
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
