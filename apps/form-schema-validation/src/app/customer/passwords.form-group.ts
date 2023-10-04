import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideFormsExtensions } from '@ng/form';

@Component({
  selector: 'ng-passwords-form-group',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    provideFormsExtensions(),
  ],
  template: `
    <ng-container ngModelGroup="passwords">
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input
          type="password"
          autocomplete="new-password"
          matInput
          [(ngModel)]="passwords.password"
          name="password"
        />
        <mat-error></mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Confirm Password</mat-label>
        <input
          type="password"
          autocomplete="new-password"
          matInput
          [(ngModel)]="passwords.passwordConfirmed"
          name="passwordConfirmed"
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
export class PasswordsForm {
  @Input() passwords: { password: string; passwordConfirmed: string } = {
    password: '',
    passwordConfirmed: '',
  };
}
