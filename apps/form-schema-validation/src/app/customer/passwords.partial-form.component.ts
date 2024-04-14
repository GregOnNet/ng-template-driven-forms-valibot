import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { formViewProviders, provideFormsSetting } from '@ng/form';
import { CustomerFormModel } from './customer-form';

@Component({
  selector: 'ng-passwords-form-group',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, provideFormsSetting()],

  template: `
    <mat-form-field>
      <mat-label>Password</mat-label>
      <input type="password" autocomplete="new-password" matInput [ngModel]="passwords()?.password" name="password" />
      <mat-error></mat-error>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Confirm Password</mat-label>
      <input
        type="password"
        autocomplete="new-password"
        matInput
        [ngModel]="passwords()?.passwordConfirmed"
        name="passwordConfirmed"
      />
      <mat-error></mat-error>
    </mat-form-field>

    <!--      <ng-error path="passwords()"/>-->
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
export class PasswordsForm {
  passwords = input<CustomerFormModel['passwords']>();
}
