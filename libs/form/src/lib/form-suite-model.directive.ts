import {
  AfterViewInit,
  DestroyRef,
  Directive,
  inject,
  Input,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormSuiteDirective } from './form-suite.directive';
import { getControlPath } from './get-control-path';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModel]',
  standalone: true,
})
export class FormSuiteModelDirective implements AfterViewInit {
  private readonly ngControl = inject(NgControl);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formDirective = inject(FormSuiteDirective);

  @Input({ required: true }) name: string = '';

  ngAfterViewInit(): void {
    this.formDirective.errors$
      .pipe(
        tap((errors) => {
          const controlPath = this.findControlPath();
          const error = errors?.[controlPath] ?? null;

          if (error) this.ngControl.control?.setErrors(error);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private findControlPath(): string {
    return getControlPath(
      this.formDirective.ngForm.control,
      this.name,
      this.ngControl.control
    );
  }
}
