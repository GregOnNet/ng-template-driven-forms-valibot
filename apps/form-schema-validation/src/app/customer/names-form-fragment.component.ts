import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { formViewProviders, provideFormsSetting } from '@ng/form';
import { CustomerFormModel } from './customer-form';

@Component({
  selector: 'ng-names-form-fragment',
  standalone: true,
  imports: [NgIf, MatFormFieldModule, MatInputModule, FormsModule, provideFormsSetting()],

  template: `
    <mat-form-field>
      <mat-label>First Name</mat-label>
      <input type="text" autocomplete="name" matInput [ngModel]="names()?.firstName" name="firstName" #name="ngModel" />
      <mat-error></mat-error>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Last Name</mat-label>
      <input type="text" autocomplete="family-name" matInput [ngModel]="names()?.lastName" name="lastName" />
      <mat-error></mat-error>
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        display: grid;
        gap: 1em;
      }
    `,
  ],
  viewProviders: [formViewProviders],
})
export class NamesFormFragmentComponent {
  names = input<CustomerFormModel['names']>();
}
