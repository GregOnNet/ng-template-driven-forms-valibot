import {
  AfterViewInit,
  Component,
  ComponentRef,
  DestroyRef,
  Directive,
  inject,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { FormSettingDirective } from './form-setting.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  template: '{{ text }}',
})
export class ErrorSummaryComponent {
  @Input({ required: true }) text = '';
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModelGroup]',
  standalone: true,
})
export class NgModelGroupErrorSubscriberDirective implements AfterViewInit, OnDestroy {
  readonly #destroyRef = inject(DestroyRef);
  readonly #viewContainerRef = inject(ViewContainerRef);

  readonly #formSetting = inject(FormSettingDirective);

  #componentRef: ComponentRef<ErrorSummaryComponent> | undefined;

  @Input('ngModelGroup') name = '';

  ngAfterViewInit(): void {
    this.#bindFormSettingErrors().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }

  ngOnDestroy(): void {
    this.#componentRef?.destroy();
  }

  #bindFormSettingErrors() {
    return this.#formSetting.errors$.pipe(
      tap((errors) => {
        const error = errors?.[this.name] ?? null;

        if (error) {
          this.#componentRef?.destroy(); // Avoid component is rendered multiple times if error is already displayed
          this.#componentRef = this.#viewContainerRef.createComponent(ErrorSummaryComponent);
          this.#componentRef.instance.text = error.auto;
        } else {
          this.#componentRef?.destroy();
        }
      })
    );
  }
}
