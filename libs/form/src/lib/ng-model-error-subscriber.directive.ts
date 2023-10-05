import {
  AfterViewInit,
  DestroyRef,
  Directive,
  inject,
  Input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { tap } from 'rxjs';
import { FormSettingDirective } from './form-setting.directive';
import { getControlPath } from './get-control-path';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModel]',
  standalone: true,
})
export class FormSuiteModelDirective implements AfterViewInit {
  private readonly ngControl = inject(NgControl);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formDirective = inject(FormSettingDirective);

  @Input({ required: true }) name = '';

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
