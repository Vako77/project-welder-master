import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'], // შეცდომაა styleUrl, სწორია styleUrls
})
export class ContactComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  submitForm() {
    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      message: this.message,
    };

    this.http.post('https://your-backend-api.com/contact', formData).subscribe({
      next: (response) => {
        console.log('Successfully sent:', response);
        alert('Message sent successfully!');
      },
      error: (err) => {
        console.error('Sending failed:', err);
        alert('Failed to send message. Please try again.');
      }
    });
  }
}
