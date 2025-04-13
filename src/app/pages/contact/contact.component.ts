import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  message: string = '';

  submitForm() {
    console.log('Form submitted:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      message: this.message,
    });
  }
}
