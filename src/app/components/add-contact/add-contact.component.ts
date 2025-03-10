import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-contact',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent {
  apiService = inject(ApiService);

  name = signal<string>(''); 
  email = signal<string>('');
  phone = signal<string>('');

  async addContact() {
    console.log('Name:', this.name());
    console.log('Email:', this.email());
    console.log('Phone:', this.phone());

    await this.apiService.addContact({
      id: Math.random(),
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });

  }
}
