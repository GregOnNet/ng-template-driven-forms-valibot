import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideFormsExtensions } from '@ng/form';
import { createEmptyCustomerFormModel } from './customer.form-model';
import { NamesForm } from './names.form-group';
import { PasswordsForm } from './passwords.form-group';

@Component({
  selector: 'ng-customer-form',
  standalone: true,
  templateUrl: './customer.form.html',
  styleUrls: ['./customer.form.scss'],
  imports: [
    FormsModule,
    MatButtonModule,
    NamesForm,
    PasswordsForm,
    provideFormsExtensions(),
  ],
})
export class CustomerForm {
  protected readonly formDefinition = createEmptyCustomerFormModel();

  save() {
    throw new Error('Method not implemented.');
  }
}
