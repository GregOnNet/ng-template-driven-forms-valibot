import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { connectToNgForm, provideFormsSetting } from '@ng/form';

@Component({
  selector: 'ng-names-form-group',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    provideFormsSetting(),
  ],
  template: `
    <h3>💁🏻‍♂️ What's your name?</h3>

    <ng-container ngModelGroup="names">
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input
          type="text"
          autocomplete="name"
          matInput
          [(ngModel)]="names.firstName"
          name="firstName"
          #name="ngModel"
        />
        <mat-error></mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input
          type="text"
          autocomplete="family-name"
          matInput
          [(ngModel)]="names.lastName"
          name="lastName"
        />
        <mat-error></mat-error>
      </mat-form-field>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: grid;
        gap: 1em;
      }
    `,
  ],
  viewProviders: [connectToNgForm],
})
export class NamesForm {
  @Input() names: { firstName: string; lastName: string } = {
    firstName: '',
    lastName: '',
  };
}
