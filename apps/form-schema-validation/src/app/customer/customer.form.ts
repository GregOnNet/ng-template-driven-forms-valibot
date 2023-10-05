import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideFormsSetting } from '@ng/form';
import { initializeCustomerFormSetting } from './customer.form-setting';
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
    provideFormsSetting(),
  ],
})
export class CustomerForm {
  protected readonly formSetting = initializeCustomerFormSetting();

  save() {
    throw new Error('Method not implemented.');
  }
}
