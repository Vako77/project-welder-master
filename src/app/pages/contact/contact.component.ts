import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isSubmitting = false;
  
  // ფორმის ველები
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    // ინიციალიზაცია თუ საჭიროა
  }

  // ელ-ფოსტის ვალიდაციის მეთოდი
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // მთლიანი ფორმის ვალიდაციის შემოწმება
  isFormValid(): boolean {
    return (
      this.firstName.length >= 3 &&
      this.lastName.length >= 3 &&
      this.isValidEmail(this.email) &&
      this.subject !== '' &&
      this.message.length >= 10
    );
  }

  submitForm(): void {
    if (!this.isFormValid()) {
      alert(this.translate.instant('contactPage.formError'));
      return;
    }

    this.isSubmitting = true;

    // ფორმის გაგზავნის სიმულაცია
    setTimeout(() => {
      alert(this.translate.instant('contactPage.successMessage'));
      
      // ფორმის გასუფთავება
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.subject = '';
      this.message = '';
      
      this.isSubmitting = false;
    }, 1500);

    //  API-ის  :
/*
    this.contactService.sendMessage({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      subject: this.subject,
      message: this.message
    }).subscribe(
      response => {
        alert(this.translate.instant('contactPage.successMessage'));
        
        // ფორმის გასუფთავება
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.subject = '';
        this.message = '';
        
        this.isSubmitting = false;
      },
      error => {
        alert(this.translate.instant('contactPage.errorMessage'));
        this.isSubmitting = false;
      }
    );
    */
  }
}