import { Component, signal } from '@angular/core';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-contacts-list',
  imports: [CommonModule, MatListModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  contacts = signal<Contact[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Bob Williams', email: 'bob.williams@example.com', phone: '234-567-8901' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '345-678-9012' },
    { id: 4, name: 'Diana Prince', email: 'diana.prince@example.com', phone: '456-789-0123' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan.hunt@example.com', phone: '567-890-1234' },
    { id: 6, name: 'Fiona Gallagher', email: 'fiona.gallagher@example.com', phone: '678-901-2345' },
    { id: 7, name: 'George Martin', email: 'george.martin@example.com', phone: '789-012-3456' },
    { id: 8, name: 'Hannah Baker', email: 'hannah.baker@example.com', phone: '890-123-4567' },
    { id: 9, name: 'Ian Curtis', email: 'ian.curtis@example.com', phone: '901-234-5678' },
    { id: 10, name: 'Jenna Fischer', email: 'jenna.fischer@example.com', phone: '012-345-6789' },
  ]);


}
