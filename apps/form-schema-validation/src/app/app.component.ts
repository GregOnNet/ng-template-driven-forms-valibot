import { Component } from '@angular/core';
import { CustomerForm } from './customer/customer.form';

@Component({
  standalone: true,
  selector: 'ng-root',
  imports: [CustomerForm],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
