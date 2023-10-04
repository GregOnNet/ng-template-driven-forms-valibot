import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { FormSuiteDirective } from './form-suite.directive';

@Component({
  selector: 'ng-error',
  standalone: true,
  template: `
    <mat-error *ngIf="error$ | async as error">{{ error }}</mat-error>
  `,
  imports: [NgIf, AsyncPipe, MatFormFieldModule],
})
export class ErrorComponent {
  protected readonly formSuite = inject(FormSuiteDirective);

  protected readonly error$ = this.formSuite.errors$.pipe(
    distinctUntilChanged(),
    filter((errors) => !!errors?.[this.path]?.auto),
    map((errors) => errors?.[this.path].auto),
    tap((error) => console.log('huhu', error))
  );

  @Input({ required: true }) path = '';
}
