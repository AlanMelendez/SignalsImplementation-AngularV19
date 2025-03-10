import { Component, inject, resource, signal } from '@angular/core';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contacts-list',
  imports: [CommonModule, MatListModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  apiService = inject(ApiService);
  deletingSignal = signal<boolean>(false);

  contactsResource = resource({
    loader: () => this.apiService.getContacts(),
  });
 
  async deleteContact(contactId: number) {
    this.deletingSignal.set(true);
    await this.apiService.deleteContact(contactId);
    this.deletingSignal.set(false);
    this.contactsResource.reload(); //It's used 
  }
   

}
