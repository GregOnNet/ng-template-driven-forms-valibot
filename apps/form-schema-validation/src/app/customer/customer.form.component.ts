import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideFormsSetting } from '@ng/form';
import { CustomerFormModel, CustomerFormValid, createCustomerForm, customerFormSchema } from './customer-form';
import { NamesFormFragmentComponent } from './names-form-fragment.component';
import { PasswordsFormFragmentComponent } from './passwords-form-fragment.component';

@Component({
  selector: 'ng-customer-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    NamesFormFragmentComponent,
    PasswordsFormFragmentComponent,
    provideFormsSetting(),
    JsonPipe,
  ],
  template: `
    <form
      [schema]="customerForm"
      (safeSubmit)="save($event)"
      (valueChanged)="formValue.set($event)"
      class="customer-form"
    >
      <h2>Create a new Customer</h2>

      <ng-container ngModelGroup="names">
        <h3>💁🏻‍♂️ What's your name?</h3>
        <ng-names-form-fragment [names]="formValue().names" />
      </ng-container>

      <ng-container ngModelGroup="passwords">
        <h3>🔒 Set your Password</h3>
        <ng-passwords-form-fragment [passwords]="formValue().passwords" />
      </ng-container>

      <button mat-raised-button color="primary">Save</button>
    </form>
    <pre>

      <code>{{ formValue() | json }}</code>

    </pre>
  `,
  styles: `
    .customer-form {
      display: grid;
      gap: 1em;
      padding: 5rem 20rem;
    }
  `,
})
export class CustomerFormComponent {
  protected customerFormSchema = customerFormSchema;
  protected formValue = signal<CustomerFormModel>({});

  protected customerForm = createCustomerForm();

  save(formValue: CustomerFormValid) {
    console.log(formValue);
  }
}
