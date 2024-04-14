import { AfterViewInit, DestroyRef, Directive, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForm } from '@angular/forms';
import { merge } from 'lodash-es';
import { BehaviorSubject, distinctUntilChanged, map, tap } from 'rxjs';
import { BaseSchema, Output, safeParse } from 'valibot';

@Directive({
  // Hook in to <form>-elements providing a setting-Attribute.
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'form[setting]',
  standalone: true,
})
export class FormSettingDirective<TSchema extends BaseSchema> implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  setting = input.required<{ schema: TSchema; model: Output<TSchema> }>();

  safeSubmit = output<Output<TSchema>>();

  public readonly ngForm = inject(NgForm, { self: true });
  public readonly errors$ = new BehaviorSubject<Record<string, { auto: string }> | null>(null);

  ngAfterViewInit(): void {
    this.updateFormModelOnFormValueChanges();

    this.ngForm.ngSubmit
      .pipe(
        map(() => safeParse(this.setting().schema, this.ngForm.value)),
        tap((result) => (result.success ? this.safeSubmit.emit(result.output) : {})),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  /**
   * Whenever a value changes we update the formModel,
   * that passes its updated values down dot the form-sections.
   *
   * That's why we do not need (ngModelChange) in a form-section, because
   * it is fed by the parent formModel (unidirectional data-flow).
   */
  private updateFormModelOnFormValueChanges() {
    this.ngForm?.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((valueChanged) => merge(this.setting().model, valueChanged)),
        tap(() => this.errors$.next(this.validate())),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private validate(): Record<string, { auto: string }> | null {
    const result = safeParse(this.setting().schema, this.setting().model);

    if (result.success) {
      return null;
    }

    return result.issues.reduce((record, error) => {
      const path = error.path?.map((segment) => segment.key).join('.');

      if (!path) return record;

      return Object.assign(record, { [path]: { auto: error.message } });
    }, {});
  }
}
