import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideFormsExtensions } from '@ng/form';

@Component({
  selector: 'ng-names-form-group',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    provideFormsExtensions(),
  ],
  template: `
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
  // #region ViewProviders
  /*
   * BIG TROUBLE WITHOUT THIS VIEWPROVIDER
   * True for Reactive Forms as well.
   * See Kara's talk: https://youtu.be/CD_t3m2WMM8?t=1826
   * See also formViewProvider in this project
   * COMMENT OUT to see:
   * - NgForm has no controls! Controls are detached from the form.
   * - Form-level status values (touched, valid, etc.) no longer change
   * - Controls still validate, update model, and update their statuses
   */
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  // #endregion
})
export class NamesForm {
  @Input() names: { firstName: string; lastName: string } = {
    firstName: '',
    lastName: '',
  };
}
