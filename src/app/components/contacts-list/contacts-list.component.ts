import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contacts-list',
  imports: [CommonModule, MatListModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule,  RouterLink, ToastModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
  providers: [MessageService]
})
export class ContactsListComponent {
  apiService = inject(ApiService);
  messageService = inject(MessageService);

  deletingSignal = signal<boolean>(false);
  loadingSignal = computed(() => this.contactsResource.isLoading() || this.deletingSignal());

  contactsResource = resource({
    loader: () => this.apiService.getContacts(),
  });
 
  async deleteContact(contactId: number) {
    this.deletingSignal.set(true);
    await this.apiService.deleteContact(contactId);
    this.deletingSignal.set(false);
    this.contactsResource.reload(); //It's used 
  }

  showErrorMessage = effect(() => {
     const error = this.contactsResource.error();
     if (error) {
       this.messageService.add({severity:'error', summary:'Error', detail: "Error fetching contacts"});
     }
  });
   
   

}
