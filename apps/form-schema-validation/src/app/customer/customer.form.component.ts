import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideFormsSetting } from '@ng/form';
import { initializeCustomerFormSetting } from './customer.form-setting';
import { NamesForm } from './names-partial-form.component';
import { PasswordsForm } from './passwords.partial-form.component';

@Component({
  selector: 'ng-customer-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, NamesForm, PasswordsForm, provideFormsSetting(), JsonPipe],
  template: `
    <form [setting]="formSetting" class="customer-form" (ngSubmit)="save()">
      <h2>Create a new Customer</h2>

      <ng-container ngModelGroup="names">
        <h3>💁🏻‍♂️ What's your name?</h3>
        <ng-names-form-group [names]="formSetting.model.names"></ng-names-form-group>
      </ng-container>

      <ng-container ngModelGroup="passwords">
        <h3>🔒 Set your Password</h3>
        <ng-passwords-form-group [passwords]="formSetting.model.passwords"></ng-passwords-form-group>
      </ng-container>

      <button mat-raised-button color="primary">Save</button>
    </form>

    <pre>

      <code>{{ formSetting.model | json }}</code>

    </pre>
  `,
  styles: `
    .customer-form {
    display: grid; gap: 1em;
    padding: 5rem 20rem;
    }
  `,
})
export class CustomerFormComponent {
  protected readonly formSetting = initializeCustomerFormSetting();

  save() {
    throw new Error('Method not implemented.');
  }
}
