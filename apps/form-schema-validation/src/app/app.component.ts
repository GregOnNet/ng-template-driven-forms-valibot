import { Component } from '@angular/core';
import { CustomerFormComponent } from './customer/customer.form.component';

@Component({
  standalone: true,
  selector: 'ng-root',
  imports: [CustomerFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
