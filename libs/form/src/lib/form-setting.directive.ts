import { AfterViewInit, DestroyRef, Directive, inject, input, output } from '@angular/core';
import { outputFromObservable, outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, debounceTime, map, tap } from 'rxjs';
import { BaseSchema, Output, safeParse } from 'valibot';
import { DeepPartial } from './deep-partial';

@Directive({
  // Hook in to <form>-elements providing a setting-Attribute.
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'form',
  standalone: true,
})
export class FormSettingDirective<TSchema extends BaseSchema> implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  public readonly ngForm = inject(NgForm, { self: true });

  schema = input.required<TSchema>();

  safeSubmit = output<Output<TSchema>>();

  valueChanged = outputFromObservable<DeepPartial<Output<TSchema>>>(this.ngForm.valueChanges!.pipe(debounceTime(0)));

  public readonly errors$ = new BehaviorSubject<Record<string, { auto: string }> | null>(null);

  ngAfterViewInit(): void {
    this.validateFormValuesOnValueChange();
    this.emitSafeSubmitWhenValidationSucceeds();
  }

  private validateFormValuesOnValueChange() {
    outputToObservable(this.valueChanged)
      .pipe(
        tap(() => this.errors$.next(this.validate())),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private emitSafeSubmitWhenValidationSucceeds() {
    this.ngForm.ngSubmit
      .pipe(
        map(() => safeParse(this.schema(), this.ngForm.value)),
        tap((result) => (result.success ? this.safeSubmit.emit(result.output) : {})),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private validate(): Record<string, { auto: string }> | null {
    const result = safeParse(this.schema(), this.ngForm.value);

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
