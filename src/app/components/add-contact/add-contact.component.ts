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
  apiService = inject(ApiService);
  router = inject(Router);
  messageService = inject(MessageService);

  name = signal<string>(''); 
  email = signal<string>('');
  phone = signal<string>('');

  loadingSave = signal<boolean>(false);

  async addContact() {
    if(!this.validateForm()) {
      return;
    }

    this.loadingSave.set(true);
    await this.apiService.addContact({
      id: Math.random(),
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Contact added successfully'});
    setTimeout(() => {
      this.loadingSave.set(false);
    this.router.navigate(['/']);
    }, 1000);
  }


  validateForm() {
    //Anyone of the fields not must been empty to enable the save button
    
    if(this.name() === '' || this.email() === '' || this.phone() === '') {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'All fields are required'});
            return false;
    }

    return true;


  }


}
