import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-add-contact',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinner,
    RouterLink,
    ToastModule,
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
  providers: [MessageService]
})
export class AddContactComponent {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  protected readonly formData = signal<ContactForm>({
    name: '',
    email: '',
    phone: ''
  });
  protected readonly loadingSave = signal<boolean>(false);

  async addContact(): Promise<void> {
    if (!this.isFormValid()) {
      return;
    }

    try {
      this.loadingSave.set(true);
      await this.saveContact();
      this.showSuccessMessage();
      await this.redirectToHome();
    } catch (error) {
      this.showErrorMessage(error);
    } finally {
      this.loadingSave.set(false);
    }
  }

  private isFormValid(): boolean {
    const { name, email, phone } = this.formData();
    
    if (!name || !email || !phone) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'All fields are required'
      });
      return false;
    }

    return true;
  }

  private async saveContact(): Promise<void> {
    const { name, email, phone } = this.formData();
    await this.apiService.addContact({
      id: this.generateId(),
      name,
      email,
      phone,
    });
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }

  private showSuccessMessage(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Contact added successfully'
    });
  }

  private showErrorMessage(error: unknown): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to add contact'
    });
    console.error('Error adding contact:', error);
  }

  private async redirectToHome(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.router.navigate(['/']);
  }

}
