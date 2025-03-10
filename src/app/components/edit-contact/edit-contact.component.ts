import { Component, computed, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ContactForm } from '../../interfaces/contact';

@Component({
  selector: 'app-edit-contact',
  imports: [CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinner,
    RouterLink,
    ToastModule,],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss',
  providers: [MessageService]
})
export class EditContactComponent {
  apiService = inject(ApiService);
  id = input<string>('1');
  protected readonly loadingSave = signal<boolean>(false);

  contactResource = resource({
    request: this.id,
    loader: ({request: id}) => this.apiService.getContact(Number(id))
  });

  //Get the contact from the resource.
  contact = computed(() =>{ 
    console.log("Change value of contact edit resource: ",this.contactResource.value());
  });  

 private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  protected  formData = signal<ContactForm>({
    name: '',
    email: '',
    phone: ''
  });

  /**
   *
   */
  constructor() {
    this.formData = linkedSignal(() => ({
      name: this.contactResource.value()?.name || '',
      email: this.contactResource.value()?.email || '',
      phone: this.contactResource.value()?.phone || ''
    }));
  }

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
    await this.apiService.updateContact({
      id: Number(this.id()),
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
